// const { default: API } = require('razorpay/dist/types/api.js')
const TransactionService = require('./transactionService.js')
const WalletService = require('./walletService.js')
const { default: mongoose } = require('mongoose')
const {
  TRANSACTION_STATUS_TYPES
} = require('../constants/transactionStatusTypes.js')
// const APIServiceFactory = require('./apiServiceFactory.js')
// const { STATUS_CODES } = require('../constants/statusCodes.js')
const { TRANSACTION_TYPES } = require('../constants/transactionTypes.js')
// const AadhaarService = require('./apiBaseService.js')
const API = require('../models/api')
const APIError = require('../utils/error/apiError.js')
const { STATUS_CODES } = require('../constants/statusCodes.js')
const DocumentService = require('./documentService.js')
// const MOCK_RESPONSES = require('../utils/mockData.js')
// const DBError = require('../utils/error/dbError.js')

class APIService {
  static async processDocumentAndUpdateBalance({
    // apiId,
    documentData,
    apiDetails,
    initiatedBy,
    initiatedByRoleId,
    clientId
  }) {
    console.log(
      'api service clientId initiatedBy,initiatedByRoleId:',
      clientId,
      initiatedBy,
      initiatedByRoleId
    )

    const apiId = apiDetails._id
    const price = apiDetails.price
    const documentType = apiDetails.documentType
    const vendorId = apiDetails.vendorId._id
    const vendorName = apiDetails.vendorId.name

    console.log('doc type:', documentType)
    console.log('api price:', price)
    console.log('api:', apiDetails)

    // First, check if the user has sufficient balance
    const wallet = await WalletService.getWalletAndCheckBalance(clientId, price)

    // Optionally log wallet information
    console.log(
      `Wallet balance before API call: ${wallet.balance}, API price: ${price}`
    )

    // // testing
    // throw new Error('custom err 1')

    // first we deduct wallet and save transaction log then we make api call
    const session = await mongoose.startSession()
    console.log('after start session')
    session.startTransaction()
    // here we deduct wallet and save transaction log
    let transactionLog
    try {
      // Deduct wallet amount
      const walletDeductionResult = await WalletService.changeWallet(
        {
          clientId,
          price,
          transactionType: TRANSACTION_TYPES.DEBIT
          //   initiatedBy,
          //   initiatedByRole,
        },
        session
      )
      console.log('after debit money wallet:', walletDeductionResult)
      console.log('documentData:', documentData)
      // // testing
      // throw new Error('custom err 2')

      // !!!IMPORTANT : need to add initiatedby and initiatedByRole after validate access implement
      transactionLog = await TransactionService.createTransaction(
        {
          clientId,
          // apiType,
          // status: TRANSACTION_STATUS_TYPES.PENDING,
          price,
          transactionType: TRANSACTION_TYPES.DEBIT,
          status: TRANSACTION_STATUS_TYPES.PENDING,
          initiatedBy,
          initiatedByRoleId,
          apiId,
          vendorId,
          requestData: documentData
        },
        session
      )
      // // testing
      //  throw new Error('custom err 2,2')
      console.log('after debit money transactionLog:', transactionLog)
      await session.commitTransaction()
    } catch (error) {
      console.log('aborting debit money')
      console.log('error:', error)
      await session.abortTransaction()
      // note:
      //   return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
      //     message: error.message
      //   })

      throw error
    } finally {
      session.endSession()
    }

    // Call API and process
    // session2 is used in case we don't get data and need to revert db operation by making new session
    // or we get data and now need to update transaction from pending to success also with adding responsedata
    const session2 = await mongoose.startSession()
    session2.startTransaction()
    // const documentService = new DocumentService(api.vendorId.name)
    const documentService = new DocumentService(vendorName)

    // Process verification using the provider system
    /* NOTE : in verifyDocument error is already handled
        so in case we got any error while calling external service in verifyDocument it still returns a response
        which has success :false  and error param which has err msg
      */
    const result = await documentService.verifyDocument(
      documentType,
      documentData
    )

    // // testing
    // throw new Error('custom err 3.0')

    const apiResponse = result.data
    const statusCode = result.status
    // const statusCode = 403
    const success = result.success
    // const success = false
    const err = result.error

    // temporarily using mocking due to not having balance in provider
    // const Mockresult = MOCK_RESPONSES.aadhaar_validation.failure.data
    // const apiResponse = Mockresult.data
    // const statusCode = Mockresult.status_code
    // const success = Mockresult.success
    // const err = Mockresult.message

    console.log(' documentType,documentData:', documentType, documentData)
    console.log('doc result:', result)
    // console.log('moc doc result:', Mockresult)
    console.log('apiResponse after veridy:', apiResponse)

    try {
      console.log('apiResponse:', apiResponse)
      console.log('statusCode:', statusCode)

      // // testing
      //  throw new Error('custom err 3')
      /*
                  when we get neither success code nor no content code
                  that means we are unable to get data
                  => we need to revert db operation by updating that data
                  => we deducted money so we need to add that monney back
                  => we made transaction log status:succesfull now we need to change it to status:failure
        */
      if (
        !success ||
        ![STATUS_CODES.SUCCESS, STATUS_CODES.NO_CONTENT].includes(statusCode)
      ) {
        //   // // testing
        //   // throw new Error('custom err 4')

        //   // throw new Error(error?error:apiResponse)
        console.log('compensating transaction')
        await APIService.compensateTransaction(
          {
            clientId,
            price,
            APItransactionId: transactionLog.id,
            httpStatus: statusCode,
            responseData: apiResponse,
            errorMessage: err
          },
          session2
        )
        // controller will handle this err
        // here err is a string returned as property from documentService.verifyDocument()
        // const errorMessage = `${documentType} verification failed`
        console.log(statusCode, err, '{{ERRR+++}}')
        throw new APIError(statusCode, err)
      } else {
        // also update transaction log with resp data,succeess and everything
        const changedTransactionLogResult =
          await TransactionService.updateTransaction(
            {
              _id: transactionLog.id,
              status: TRANSACTION_STATUS_TYPES.SUCCESS,
              httpStatus: statusCode,
              responseData: apiResponse,
              // errorMessage: null,
              completedAt: Date.now()
            },
            session2
          )

        console.log(
          'after  succeess changedTransactionLogResult:',
          changedTransactionLogResult
        )
        await session2.commitTransaction()
        const reponseMessage = `${documentType} verification successful`
        console.log(
          'statusCode, apiResponse, reponseMessage',
          statusCode,
          apiResponse,
          reponseMessage
        )
        return { statusCode, apiResponse, reponseMessage }
      }
    } catch (error) {
      /*
          db call is unsuccefull
          1.either saving transaction as success and responsedata
          2.or compensateTransaction failure
        */

      console.log('inner err:', error)

      /*
         if err is of APIError type that means it is thrown after compansate transaction is suceesfull
         (bcz we are throwing it just after compensate transaction succefully executed in try block)
         we are throwing err so controller knows we are unable to get data
         so in that case just throw err again no need to make any db operation and pass it to controller
        */
      if (error instanceof APIError) {
        throw error
      }

      await session2.abortTransaction()
      console.log('after aborting session2')
      // testing
      // throw new Error('custom err 6')

      // error may also come in case of compensate db error or succcess tran saving in db error
      // in that case we need to try again using new session
      const session3 = await mongoose.startSession()
      session3.startTransaction()

      if (
        success &&
        [STATUS_CODES.SUCCESS, STATUS_CODES.NO_CONTENT].includes(statusCode)
      ) {
        const changedTransactionLogResult =
          await TransactionService.updateTransaction(
            {
              _id: transactionLog.id,
              status: TRANSACTION_STATUS_TYPES.SUCCESS,
              httpStatus: statusCode,
              responseData: apiResponse,
              // errorMessage: null,
              completedAt: Date.now()
            },
            session3
          )

        console.log(
          'after  succeess changedTransactionLogResult:',
          changedTransactionLogResult
        )
        await session3.commitTransaction()
        session3.endSession()
        const reponseMessage = `${documentType} verification successful`
        console.log(
          'statusCode, apiResponse, reponseMessage',
          statusCode,
          apiResponse,
          reponseMessage
        )
        return { statusCode, apiResponse, reponseMessage }
      } else {
        await APIService.compensateTransaction(
          {
            clientId,
            price,
            APItransactionId: transactionLog.id,
            httpStatus: statusCode,
            responseData: apiResponse,
            errorMessage: err
          },
          session3
        )
        console.log('before ending session3')
        session3.endSession()
        console.log('after ending session3')
        // controller will handle this err
        // here err is a string returned as property from documentService.verifyDocument()
        // const errorMessage = `${documentType} verification failed, error: ${err}`
        throw new APIError(statusCode, err)
      }
    } finally {
      session2.endSession()
    }
  }

  static async compensateTransaction(data, session) {
    const {
      clientId,
      price,
      APItransactionId,
      httpStatus,
      responseData,
      errorMessage
    } = data
    console.log('compensateTransaction called')
    console.log(
      'clientid,price,tran type:',
      clientId,
      price,
      TRANSACTION_TYPES.CREDIT
    )
    const walletCreditResult = await WalletService.changeWallet(
      {
        clientId,
        price,
        transactionType: TRANSACTION_TYPES.CREDIT
        //   initiatedBy,
        //   initiatedByRole,
      },
      session
    )
    console.log('after credit money wallet:', walletCreditResult)

    const changedTransactionLogResult =
      await TransactionService.updateTransaction(
        {
          _id: APItransactionId,
          status: TRANSACTION_STATUS_TYPES.FAILURE,
          httpStatus,
          responseData,
          errorMessage,
          completedAt: Date.now()
        },
        session
      )
    console.log(
      'after credit money transactionLog:',
      changedTransactionLogResult
    )
    // console.log('throwing random db err')
    // testing
    // throw new DBError(409, 'random db error')

    await session.commitTransaction()
    console.log('after commit compesante trans')
    // session.endSession()
  }

  static async getAPIDetails(apiId) {
    // Fetch specific fields from the `API` collection and the `vendorId` reference
    const api = await API.findById(apiId)
      .select('_id price documentType vendorId') // Select specific fields from the API document
      .populate({
        path: 'vendorId',
        select: '_id name' // Fetch only specific fields from the vendor document
      })

    // Check if API exists
    if (!api) {
      throw new APIError(STATUS_CODES.NOT_FOUND, 'API not found')
    }

    return api
  }
}

module.exports = APIService

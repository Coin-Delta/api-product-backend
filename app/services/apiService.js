// const { default: API } = require('razorpay/dist/types/api.js')
const TransactionService = require('./transactionService/transactionService.js')
const WalletService = require('./walletService/walletService.js')
const { default: mongoose } = require('mongoose')
const {
  TRANSACTION_STATUS_TYPES
} = require('../constants/transactionStatusTypes.js')
// const APIServiceFactory = require('./apiServiceFactory.js')
// const { STATUS_CODES } = require('../constants/statusCodes.js')
const { TRANSACTION_TYPES } = require('../constants/transactionTypes.js')
// const AadhaarService = require('./apiBaseService.js')

class ApiService {
  static async processDocumentAndUpdateBalance({
    apiType,
    price,
    req,
    documentData,
    apiId,
    vendorId,
    clientId
  }) {
    try {
      //   const { idNumber } = req.body
      //   const clientId = req.user.role === 'BCA' ? req.user._id : req.user.BCAId
      const initiatedBy = req?.user?._id
      const initiatedByRole = req?.user?.role

      //   const api = await API.findById(apiId).populate('vendorId')
      //   if (!api) {
      //     return ResponseUtil.send(res, 404, { message: 'API not found' })
      //   }
      //   const apiType = api.documentType
      //   const price = api.price

      // First, check if the user has sufficient balance
      const wallet = await WalletService.getWalletAndCheckBalance(
        clientId,
        price
      )

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
          clientId,
          price,
          TRANSACTION_TYPES.DEBIT,
          initiatedBy,
          initiatedByRole,
          session
        )
        console.log('after debit money wallet:', walletDeductionResult)
        console.log('documentData:', documentData)

        transactionLog = await TransactionService.logAPITransaction(
          {
            clientId,
            apiType,
            status: TRANSACTION_STATUS_TYPES.PENDING,
            //   statusCode:STATUS_CODES.SUCCESS,
            price,
            transactionType: TRANSACTION_TYPES.DEBIT,
            initiatedBy,
            initiatedByRole,
            apiId,
            vendorId,
            documentData
          },
          session
        )
        // testing
        //  throw new Error('custom err 2')
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
      const session2 = await mongoose.startSession()
      session2.startTransaction()
      try {
        // const apiService = new VerificationApiServices(process.env.API_TOKEN)
        // const { data: apiResponse, statusCode } = await apiService.validateAadhaar(
        //   idNumber
        // )
        // const apiService = APIServiceFactory.getAPIService(
        //   apiType,
        //   apiId,
        //   vendorId
        // )

        // const apiService = new AadhaarService(vendorId, apiId)
        const apiResponse = {
          phone: '238917'
        }
        const statusCode = 200
        const success = true
        const error = null
        // con

        // const {
        //   data: apiResponse,
        //   status: statusCode,
        //   success,
        //   error
        // } = await apiService.verifyAadhaar(
        //   // apiType,
        //   // data:documentData
        //   documentData
        // )
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
          // statusCode !== STATUS_CODES.SUCCESS &&
          // statusCode !== STATUS_CODES.NO_CONTENT
          !success
        ) {
          const walletCreditResult = await WalletService.changeWallet(
            clientId,
            price,
            TRANSACTION_TYPES.CREDIT,
            initiatedBy,
            initiatedByRole,
            session2
          )
          console.log(
            'after no succeess walletCreditResult:',
            walletCreditResult
          )

          // // testing
          // throw new Error('custom err 4')
          // -------------------------------------start from here-------------------------------------------------------------------------
          // if we got error while calling ext api then verify doc will return err in struct
          // but if we don't get err but still not succes then we are storing apiResponse
          const err = error ? error : apiResponse
          const changedTransactionLogResult =
            await TransactionService.updateAPITransaction(
              {
                _id: transactionLog.id,
                status: TRANSACTION_STATUS_TYPES.FAILURE,
                httpStatus: statusCode,
                responseData: apiResponse,
                errorMessage: err,
                completedAt: Date.now()
              },
              session2
            )

          console.log(
            'after no succeess changedTransactionLogResult:',
            changedTransactionLogResult
          )

          // // testing
          // throw new Error('custom err 5')

          // throw err or return {errMsg,statuscode}

          // throw new Error(error?error:apiResponse)
          await session2.commitTransaction()
          return { statusCode, error: err }
        } else {
          // also update transaction log with resp data,succeess and everything
          const changedTransactionLogResult =
            await TransactionService.updateAPITransaction(
              {
                _id: transactionLog.id,
                status: TRANSACTION_STATUS_TYPES.SUCCESS,
                httpStatus: statusCode,
                responseData: apiResponse,
                errorMessage: null,
                completedAt: Date.now()
              },
              session2
            )

          console.log(
            'after  succeess changedTransactionLogResult:',
            changedTransactionLogResult
          )
          await session2.commitTransaction()

          return { statusCode, apiResponse, success }
        }

        // Return API response
        // return res.status(statusCode).json(apiResponse)
        // return {statusCode,apiResponse}
      } catch (error) {
        /*
                  this means db operation is successfull but api call is not
                  (or api is also successfull but revert db call error)
                  so we need to reverse the effect of db call
                  and also after that send err response
                  but we need to abort revert db in case it is due to that
                */

        // latest :  api call is successful but db op is not
        console.log('inner err:', error)

        await session2.abortTransaction()

        // testing
        // throw new Error('custom err 6')

        // new sesion for revert db
        const session3 = await mongoose.startSession()
        session3.startTransaction()
        const walletCreditResult = await WalletService.changeWallet(
          clientId,
          price,
          TRANSACTION_TYPES.CREDIT,
          initiatedBy,
          initiatedByRole,
          session3
        )
        console.log('after credit money wallet:', walletCreditResult)

        const changedTransactionLogResult =
          await TransactionService.updateAPITransaction(
            {
              _id: transactionLog.id,
              status: TRANSACTION_STATUS_TYPES.FAILURE,
              errorMessage: error.message // actually not sure wheather err is caused due to db err or api err so how do we know structure of err
              // responseDa
            },
            session3
          )
        console.log(
          'after credit money transactionLog:',
          changedTransactionLogResult
        )

        await session3.commitTransaction()
        session3.endSession()

        throw error

        // return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
        //   message: error.message
        // })
      } finally {
        session2.endSession()
      }

      // Return API response
      // return res.status(statusCode).json(apiResponse)
    } catch (error) {
      console.log('big err:', error)
      // await session.abortTransaction()
      throw error
      //   return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
      //     message: error.message
      //   })
    } finally {
      console.log('calling main finally')
      // session.endSession()
    }
  }
}

module.exports = ApiService

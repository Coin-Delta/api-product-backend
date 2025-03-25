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
const MOCK_RESPONSES = require('../utils/mockData.js')
// const DBError = require('../utils/error/dbError.js')

class APIService {
  //   static async processDocumentAndUpdateBalance({
  //     apiType,
  //     price,
  //     req,
  //     documentData,
  //     apiId,
  //     vendorId,
  //     clientId
  //   }) {
  static async processDocumentAndUpdateBalance({
    documentData,
    apiDetails,
    clientId
  }) {
    const { _id: apiId, price, documentType, vendorId } = apiDetails
    const vendorName = apiDetails.vendorId.name
    let session = null

    try {
      // 1. Check wallet balance
      await WalletService.getWalletAndCheckBalance(clientId, price)

      // 2. Verify document
      const documentService = new DocumentService(vendorName)
      const result = await documentService.verifyDocument(
        documentType,
        documentData
      )

      const {
        status: statusCode,
        success,
        error,
        remark,
        data: apiResponse = null
      } = result

      // 3. Handle transaction based on verification result
      session = await mongoose.startSession()
      session.startTransaction()

      const isSuccessfulVerification = [
        STATUS_CODES.SUCCESS,
        STATUS_CODES.UNPROCESSABLE_ENTITY
      ].includes(statusCode)

      const transactionData = {
        clientId,
        price: isSuccessfulVerification ? price : 0,
        transactionType: TRANSACTION_TYPES.DEBIT,
        apiId,
        vendorId,
        requestData: documentData,
        status: isSuccessfulVerification
          ? TRANSACTION_STATUS_TYPES.SUCCESS
          : TRANSACTION_STATUS_TYPES.FAILURE,
        httpStatus: statusCode,
        remark,
        responseData: apiResponse,
        errorMessage: error,
        completedAt: Date.now()
      }

      if (isSuccessfulVerification) {
        const { afterBalance } = await WalletService.changeWallet(
          {
            clientId,
            price,
            transactionType: TRANSACTION_TYPES.DEBIT
          },
          session
        )
        transactionData.afterBalance = afterBalance
        await TransactionService.createTransaction(transactionData, session)
        await session.commitTransaction()
      }

      if (!isSuccessfulVerification) {
        const transactionData = {
          clientId,
          price: 0,
          transactionType: TRANSACTION_TYPES.DEBIT,
          apiId,
          vendorId,
          requestData: documentData,
          status: isSuccessfulVerification
            ? TRANSACTION_STATUS_TYPES.SUCCESS
            : TRANSACTION_STATUS_TYPES.FAILURE,
          httpStatus: statusCode,
          remark,
          responseData: apiResponse,
          errorMessage: error,
          completedAt: Date.now()
        }
        await TransactionService.createTransaction(transactionData, session)
        await session.commitTransaction()
        throw new APIError(statusCode, error)
      }
      console.log(result, '[{RESULT}]')
      return {
        result,
        responseMessage: remark
      }
    } catch (error) {
      if (session) {
        try {
          // Check if the session has an active transaction that hasn't been committed
          if (session.transaction && session.transaction.state === 'starting') {
            await session.abortTransaction()
          }
        } catch (abortError) {
          // Log abort error if needed, but throw the original error
          console.error('Error aborting transaction:', abortError)
        }
      }
      throw error
    } finally {
      if (session) {
        session.endSession()
      }
    }
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

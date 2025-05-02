const TransactionService = require('./transactionService.js')
const WalletService = require('./walletService.js')
const { default: mongoose } = require('mongoose')
const {
  TRANSACTION_STATUS_TYPES
} = require('../constants/transactionStatusTypes.js')
const { TRANSACTION_TYPES } = require('../constants/transactionTypes.js')
const API = require('../models/api')
const APIError = require('../utils/error/apiError.js')
const { STATUS_CODES } = require('../constants/statusCodes.js')
const DocumentService = require('./documentService.js')

class APIService {
  static async processDocumentAndUpdateBalance({
    documentData,
    apiDetails,
    clientId,
    initiatedBy,
    initiatedByRoleId,
    skipWalletDeduction = false // Add parameter to skip wallet deduction for polling
  }) {
    console.log('API service processing:', {
      documentData,
      apiDetails,
      clientId,
      skipWalletDeduction
    })

    // Extract API details
    const apiId = apiDetails._id
    const price = apiDetails.price
    const documentType = apiDetails.documentType
    const vendorId = apiDetails.vendorId._id
    const vendorName = apiDetails.vendorId.name

    // Check if the user has sufficient balance (without deducting)
    // Skip this check if skipWalletDeduction is true
    let wallet = null
    if (!skipWalletDeduction) {
      wallet = await WalletService.getWalletAndCheckBalance(clientId, price)
      console.log(
        `Wallet balance before API call: ${wallet.balance}, API price: ${price}`
      )
    } else {
      // Just get the wallet info without checking balance
      wallet = await WalletService.findWallet(clientId)
    }

    try {
      // Make API call through DocumentService first
      const documentService = new DocumentService(vendorName)
      const result = await documentService.verifyDocument(
        documentType,
        documentData
      )

      console.log('API Response:', result)

      const apiResponse = result.data
      const statusCode = result.status
      const isSuccess = result.success
      const err = result.error
      const remark = result.remark
      const referenceId = result.referenceId

      // If status is 200 or 422, we proceed with wallet deduction
      // regardless of the success flag
      const shouldDeductWallet =
        !skipWalletDeduction &&
        (statusCode === STATUS_CODES.SUCCESS ||
          statusCode === STATUS_CODES.UNPROCESSABLE_ENTITY)

      console.log(
        'Should deduct wallet?',
        shouldDeductWallet,
        'Status code:',
        statusCode
      )

      if (!shouldDeductWallet) {
        if (skipWalletDeduction) {
          console.log('Skipping wallet deduction as requested')
          return {
            statusCode,
            apiResponse,
            responseMessage: null,
            remark,
            referenceId
          }
        }

        console.log('Processing as FAILED transaction - no wallet deduction')
        // API call failed - create failure transaction log without deducting wallet
        await this.logFailedTransaction({
          clientId,
          price,
          apiId,
          vendorId,
          documentData,
          statusCode,
          apiResponse,
          err,
          initiatedBy,
          initiatedByRoleId,
          remark,
          afterBalance: wallet.balance
        })

        throw new APIError(statusCode, err || 'API verification failed')
      }

      console.log('Processing as transaction with wallet deduction')

      // Determine transaction status - Only SUCCESS if status is 200 and isSuccess is true
      const transactionStatus =
        statusCode === STATUS_CODES.SUCCESS && isSuccess === true
          ? TRANSACTION_STATUS_TYPES.SUCCESS
          : TRANSACTION_STATUS_TYPES.FAILURE

      // API call requires deduction - proceed to deduct wallet and log transaction
      const transactionLog = await this.deductWalletAndCreateSuccessTransaction(
        {
          clientId,
          price,
          apiId,
          vendorId,
          documentData,
          statusCode,
          apiResponse,
          initiatedBy,
          initiatedByRoleId,
          remark,
          transactionStatus
        }
      )

      // Determine response message based on transaction status
      let responseMessage = `${documentType} verification successful`
      if (transactionStatus !== TRANSACTION_STATUS_TYPES.SUCCESS) {
        responseMessage = `${documentType} verification completed but with issues`
      }

      return { statusCode, apiResponse, responseMessage, remark, referenceId }
    } catch (error) {
      console.error('Error in API processing:', error)
      // If it's not already an APIError, convert it
      if (!(error instanceof APIError)) {
        throw new APIError(
          STATUS_CODES.SERVER_ERROR,
          error.message || 'Processing failed'
        )
      }
      throw error
    }
  }

  static async logFailedTransaction({
    clientId,
    price,
    apiId,
    vendorId,
    documentData,
    statusCode,
    apiResponse,
    err,
    initiatedBy,
    initiatedByRoleId,
    remark,
    afterBalance
  }) {
    console.log('Logging failed transaction')
    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      // If afterBalance wasn't provided, get current wallet balance
      if (afterBalance === undefined) {
        const wallet = await WalletService.findWallet(clientId)
        afterBalance = wallet ? wallet.balance : null
      }

      // Create transaction log with FAILURE status
      const transaction = await TransactionService.createTransaction(
        {
          clientId,
          price: 0,
          transactionType: TRANSACTION_TYPES.DEBIT, // Still recording as DEBIT type
          status: TRANSACTION_STATUS_TYPES.FAILURE,
          initiatedBy,
          initiatedByRoleId,
          apiId,
          vendorId,
          requestData: documentData,
          responseData: apiResponse,
          httpStatus: statusCode,
          errorMessage: err,
          afterBalance,
          remark,
          completedAt: Date.now()
        },
        session
      )

      console.log('Failed transaction logged:', transaction.id)
      await session.commitTransaction()
      return transaction
    } catch (error) {
      console.error('Error logging failed transaction:', error)
      await session.abortTransaction()
      // We don't throw here as the original API error is more important
    } finally {
      session.endSession()
    }
  }

  static async deductWalletAndCreateSuccessTransaction({
    clientId,
    price,
    apiId,
    vendorId,
    documentData,
    statusCode,
    apiResponse,
    initiatedBy,
    initiatedByRoleId,
    remark,
    transactionStatus
  }) {
    console.log('Deducting wallet and creating transaction')
    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      console.log(
        'Deducting wallet for client:',
        clientId,
        'amount:',
        price,
        'statusCode :',
        statusCode
      )
      // Deduct wallet amount - only pass parameters WalletService expects
      const updatedWallet = await WalletService.changeWallet(
        {
          clientId,
          price,
          transactionType: TRANSACTION_TYPES.DEBIT
        },
        session
      )

      console.log('Wallet updated:', statusCode)

      // Create transaction log with the provided status
      const transactionLog = await TransactionService.createTransaction(
        {
          clientId,
          price,
          transactionType: TRANSACTION_TYPES.DEBIT,
          status:
            statusCode === 422
              ? TRANSACTION_STATUS_TYPES.FAILURE
              : transactionStatus,
          initiatedBy,
          initiatedByRoleId,
          apiId,
          vendorId,
          requestData: documentData,
          responseData: apiResponse,
          httpStatus: statusCode, // This field exists in schema but may not be getting saved
          afterBalance: updatedWallet.balance,
          remark,
          completedAt: Date.now()
        },
        session
      )

      console.log(
        'Transaction logged:',
        transactionLog.id,
        'Status:',
        transactionStatus
      )
      await session.commitTransaction()
      return transactionLog
    } catch (error) {
      console.error('Error in wallet deduction:', error)
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }

  static async getAPIDetails(apiId) {
    const api = await API.findById(apiId)
      .select('_id price documentType vendorId')
      .populate({
        path: 'vendorId',
        select: '_id name'
      })

    if (!api) {
      throw new APIError(STATUS_CODES.NOT_FOUND, 'API not found')
    }

    return api
  }
}

module.exports = APIService

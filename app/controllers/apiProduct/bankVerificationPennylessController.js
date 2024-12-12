const API = require('../../models/api')
const WalletService = require('../../services/walletService')
const ResponseHelper = require('../../utils/responseHelper')
const TransactionService = require('../../services/transactionService')
const DocumentService = require('../../services/documentService')
const MOCK_RESPONSES = require('../../utils/mockData')

class BankVerificationPennylessController {
  static async verifyBankDetails(req, res) {
    try {
      const { apiId, documentData } = req.body
      const { bcaId: clientId } = req.user

      // Find API configuration
      const api = await API.findById(apiId).populate('vendorId')
      if (!api) {
        return ResponseHelper.notFound(res, 'API not found')
      }

      // Check wallet balance
      let wallet
      try {
        wallet = await WalletService.checkAndDeductBalance(clientId, api.price)
      } catch (error) {
        return ResponseHelper.error(res, error.message, 400)
      }

      // Create transaction record
      const transaction = await TransactionService.createTransaction(
        api._id,
        api.vendorId._id,
        documentData,
        api.price
      )

      try {
        // Initialize document service with vendor
        // const documentService = new DocumentService(api.vendorId.code)
        const documentService = new DocumentService('surepass')

        // Process verification using the provider system
        const result = await documentService.verifyDocument(
          'bank_verification_pennyless',
          documentData
        )
        console.log(result, '{RESUL}')
        // Update transaction
        await TransactionService.updateTransaction(transaction, result)

        // Deduct balance only on success
        if (result.success && [200, 204].includes(result.status)) {
          await WalletService.deductBalance(wallet, api.price)
        }

        return result.success
          ? ResponseHelper.success(
              res,
              result.data,
              'Bank verification successful'
            )
          : ResponseHelper.error(
              res,
              'Bank verification failed',
              400,
              result.error
            )
      } catch (error) {
        // Update transaction with error
        console.log(error, 'ERR++++')
        await TransactionService.updateTransaction(transaction, {
          success: false,
          error: error.message,
          status: 500
        })

        return ResponseHelper.serverError(res, error)
      }
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }
  static async verifyBankDetailsTest(req, res) {
    try {
      const { documentData } = req.body

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? MOCK_RESPONSES.bank_verification_pennyless.success.data
        : MOCK_RESPONSES.bank_verification_pennyless.failure.data

      return mockResponse.success
        ? ResponseHelper.success(
            res,
            mockResponse.data,
            mockResponse.message,
            mockResponse.status_code
          )
        : ResponseHelper.error(
            res,
            mockResponse.message,
            mockResponse.status_code,
            mockResponse.data
          )
    } catch (error) {
      console.log(error)
      return ResponseHelper.serverError(res, error)
    }
  }
}

module.exports = BankVerificationPennylessController

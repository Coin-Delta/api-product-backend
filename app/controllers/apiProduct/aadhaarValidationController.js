const API = require('../../models/api')
const WalletService = require('../../services/walletService')
const ResponseHelper = require('../../utils/responseHelper')
const TransactionService = require('../../services/transactionService')
const DocumentService = require('../../services/documentService')

class AadhaarController {
  static async verifyAadhaar(req, res) {
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
          'aadhaar',
          documentData
        )

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
              'Aadhaar verification successful'
            )
          : ResponseHelper.error(
              res,
              'Aadhaar verification failed',
              400,
              result.error
            )
      } catch (error) {
        // Update transaction with error
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
}

module.exports = AadhaarController
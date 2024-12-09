// controllers/aadhaar.controller.js
const AadhaarService = require('../../services/apiBaseService')
const API = require('../../models/api')
const APITransaction = require('../../models/apiTransaction')
const ResponseUtil = require('../../utils/reponse')

class AadhaarController {
  static async verifyAadhaar(req, res, next) {
    try {
      const { apiId, documentData } = req.body

      // Find the API configuration
      const api = await API.findById(apiId).populate('vendorId')
      if (!api) {
        return ResponseUtil.send(res, 404, { message: 'API not found' })
      }

      // Create transaction record
      const transaction = new APITransaction({
        apiId: api._id,
        vendorId: api.vendorId._id,
        requestData: documentData,
        status: 'PENDING'
      })
      await transaction.save()

      try {
        // Initialize service with vendor details
        const aadhaarService = new AadhaarService(api.vendorId.code, api._id)

        // Process verification
        const result = await aadhaarService.verifyAadhaar(documentData)

        // Update transaction
        transaction.status = result.success ? 'SUCCESS' : 'FAILED'
        transaction.responseData = result.data
        transaction.httpStatus = result.status
        transaction.errorMessage = result.error = new Date()
        await transaction.save()

        return ResponseUtil.send(res, result.success ? 200 : 400, result)
      } catch (error) {
        // Update transaction with error
        transaction.status = 'FAILED'
        transaction.errorMessage = error.message
        transaction.completedAt = new Date()
        await transaction.save()
        throw error
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AadhaarController

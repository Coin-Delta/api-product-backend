const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const MOCK_RESPONSES = require('../../utils/mockData')

class PANComprehensiveController {
  static async verifyPanCard(req, res) {
    let documentType
    try {
      const { apiId, documentData } = req.body
      const { bcaId: clientId } = req.user

      const apiDetails = await APIService.getAPIDetails(apiId)
      console.log('api details:', apiDetails)
      documentType = apiDetails.documentType

      const { statusCode, apiResponse } =
        await APIService.processDocumentAndUpdateBalance({
          // apiId,
          apiDetails,
          documentData,
          clientId
        })

      // console.log('req:', req)
      console.log('apiResponse controller:', apiResponse)

      return ResponseHelper.customSuccess(
        res,
        apiResponse,
        `${documentType} Verification successfull`,
        statusCode,
        apiId
      )
    } catch (error) {
      if (error instanceof BaseError) {
        console.log('error msg:', error.message)
        console.log('full err:', error)
        if (documentType) {
          return ResponseHelper.customError(
            res,
            `${documentType} Verification failed`,
            error.statusCode,
            error,
            apiId
          )
        }
        return ResponseHelper.customError(
          res,
          error.message,
          error.statusCode,
          error,
          apiId
        )
      }
      return ResponseHelper.customError(
        res,
        'Internal server error',
        500,
        error,
        apiId
      )
    }
  }
  static async verifyPanCardTest(req, res) {
    try {
      const { documentData, apiId } = req.body

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? MOCK_RESPONSES.pan_comprehensive.success.data
        : MOCK_RESPONSES.pan_comprehensive.failure.data

      return mockResponse.success
        ? ResponseHelper.customSuccess(
            res,
            mockResponse.data,
            mockResponse.message,
            mockResponse.status_code,
            apiId
          )
        : ResponseHelper.customError(
            res,
            mockResponse.message,
            mockResponse.status_code,
            mockResponse.data,
            apiId
          )
    } catch (error) {
      console.log(error)
      return ResponseHelper.customError(
        res,
        'Internal server error',
        500,
        error,
        apiId
      )
    }
  }
}

module.exports = PANComprehensiveController

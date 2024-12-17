const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const MOCK_RESPONSES = require('../../utils/mockData')

class DirectorPhoneNumberController {
  static async verifyDirectorPhone(req, res) {
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

      return ResponseHelper.success(
        res,
        apiResponse,
        `${documentType} Verification successfull`,
        statusCode
      )
    } catch (error) {
      if (error instanceof BaseError) {
        console.log('error msg:', error.message)
        console.log('full err:', error)
        if (documentType) {
          return ResponseHelper.error(
            res,
            `${documentType} Verification failed`,
            error.statusCode,
            error
          )
        }
        return ResponseHelper.error(res, error.message, error.statusCode, error)
      }
      return ResponseHelper.serverError(res, error)
    }
  }
  static async verifyDirectorPhoneTest(req, res) {
    try {
      const { documentData } = req.body

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? MOCK_RESPONSES.director_phone.success.data
        : MOCK_RESPONSES.director_phone.failure.data

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

module.exports = DirectorPhoneNumberController

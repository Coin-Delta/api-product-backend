const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
// const MOCK_RESPONSES = require('../../utils/mockData')
const NEW_MOCK_RESPONSES = require('../../utils/newMockData.js')
const util = require('util')

// const { STATUS_CODES } = require('../../constants/statusCodes.js')

class DynamicController {
  static async verifyDocument(req, res) {
    let documentType
    try {
      const { apiId, documentData } = req.body
      const {
        bcaId: clientId,
        userId: initiatedBy,
        roleId: initiatedByRoleId
      } = req.user

      // console.log('user details:', util.inspect(req.user, { depth: null }))

      const apiDetails = await APIService.getAPIDetails(apiId)
      console.log('api details:', apiDetails)

      documentType = apiDetails.documentType

      const { statusCode, apiResponse } =
        await APIService.processDocumentAndUpdateBalance({
          // apiId,
          apiDetails,
          documentData,
          clientId,
          initiatedBy,
          initiatedByRoleId
        })

      console.log('req:', req)
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

  static async verifyDocumentTest(req, res) {
    let documentType
    try {
      const { apiId, documentData } = req.body
      const apiDetails = await APIService.getAPIDetails(apiId)
      console.log('api details:', apiDetails)
      documentType = apiDetails.documentType

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? NEW_MOCK_RESPONSES[documentType]?.success.data
        : NEW_MOCK_RESPONSES[documentType]?.failure.data

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

module.exports = DynamicController

const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const MOCK_RESPONSES = require('../../utils/mockData')

class EmploymentHistoryController {
  static async verifyEmploymentHistory(req, res) {
    let documentType
    try {
      const { apiId, documentData } = req.body
      const { bcaId: clientId } = req.user

      const apiDetails = await APIService.getAPIDetails(apiId)
      console.log('api details:', apiDetails)
      documentType = apiDetails.documentType
      const {
        statusCode,
        apiResponse,
        isSuccess,
        responseMessage,
        remark,
        referenceId,
        message,
        messageCode
      } = await APIService.processDocumentAndUpdateBalance({
        apiDetails,
        documentData,
        clientId
      })

      console.log('apiResponse controller:', apiResponse)
      const referenceApiId = '6818b79caf033a39cd7c704b'

      return ResponseHelper.employmentCompositeAPIsuccess(
        res,
        apiResponse,
        responseMessage || `${documentType} Verification successful`,
        statusCode,
        remark,
        referenceId,
        messageCode,
        referenceApiId
      )
    } catch (error) {
      if (error instanceof BaseError) {
        const referenceApiId = '6818b79caf033a39cd7c704b'

        console.log('error details:', {
          message: error.message,
          statusCode: error.statusCode,
          messageCode: error.messageCode,
          remark: error.remark,
          stack: error.stack
        })

        if (documentType) {
          return ResponseHelper.error(
            res,
            error.message || `${documentType} Verification failed`,
            error.statusCode,
            {
              error: error.message,
              messageCode: error.messageCode,
              remark: error.remark,
              stack:
                process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            error.remark,
            null,
            error.messageCode,
            referenceApiId
          )
        }
        return ResponseHelper.employmentCompositeAPIError(
          res,
          error.message,
          error.statusCode,
          {
            error: error.message,
            messageCode: error.messageCode,
            remark: error.remark,
            stack:
              process.env.NODE_ENV === 'development' ? error.stack : undefined
          },
          error.remark,
          null,
          error.messageCode,
          referenceApiId
        )
      }

      // For non-BaseError errors
      return ResponseHelper.serverError(
        res,
        error.message,
        error.status || 500,
        {
          error: error.message,
          stack:
            process.env.NODE_ENV === 'development' ? error.stack : undefined
        }
      )
    }
  }
  static async verifyEmploymentHistoryTest(req, res) {
    try {
      const { documentData } = req.body

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? MOCK_RESPONSES.employment_history_uan.success.data
        : MOCK_RESPONSES.employment_history_uan.failure.data
      const referenceApiId = '6818b79caf033a39cd7c704b'

      return mockResponse.success
        ? ResponseHelper.employmentCompositeAPIsuccess(
            res,
            mockResponse.data,
            mockResponse.message,
            mockResponse.status_code,
            null,
            null,
            referenceApiId
          )
        : ResponseHelper.employmentCompositeAPIError(
            res,
            mockResponse.message,
            mockResponse.status_code,
            mockResponse.data,
            null,
            null,
            referenceApiId
          )
    } catch (error) {
      console.log(error)
      return ResponseHelper.serverError(res, error)
    }
  }
}

module.exports = EmploymentHistoryController

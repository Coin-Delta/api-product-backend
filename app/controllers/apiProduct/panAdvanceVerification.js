const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const MOCK_RESPONSES = require('../../utils/mockData')

class PANAdvanceController {
  static async verifyPanCard(req, res) {
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

      return ResponseHelper.customSuccess(
        res,
        apiResponse,
        responseMessage || `${documentType} Verification successful`,
        statusCode,
        apiId
      )
    } catch (error) {
      if (error instanceof BaseError) {
        console.log('error details:', {
          message: error.message,
          statusCode: error.statusCode,
          messageCode: error.messageCode,
          remark: error.remark,
          stack: error.stack
        })

        if (documentType) {
          return ResponseHelper.customError(
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
            apiId
          )
        }
        return ResponseHelper.customError(
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
          apiId
        )
      }

      // For non-BaseError errors
      return ResponseHelper.customError(
        res,
        error.message,
        error.status || 500,
        {
          error: error.message,
          stack:
            process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        apiId
      )
    }
  }
  static async verifyPanCardTest(req, res) {
    try {
      const { documentData, apiId } = req.body

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? MOCK_RESPONSES.pan_advance_verification.success.data
        : MOCK_RESPONSES.pan_advance_verification.failure.data

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

module.exports = PANAdvanceController

const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const MOCK_RESPONSES = require('../../utils/mockData')

class BankVerificationController {
  static async verifyBankDetails(req, res) {
    let documentType
    let apiId
    try {
      const { apiId: reqApiId, documentData } = req.body
      apiId = reqApiId
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

      // Add account_no to the response data
      const modifiedApiResponse = {
        ...apiResponse,
        account_no: documentData.id_number
      }

      return ResponseHelper.customSuccess(
        res,
        modifiedApiResponse,
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
            error.messageCode
          )
        }
        return ResponseHelper.error(
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
          error.messageCode
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
  static async verifyBankDetailsTest(req, res) {
    try {
      const { apiId, documentData } = req.body

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? MOCK_RESPONSES.bank_verification.success.data
        : MOCK_RESPONSES.bank_verification.failure.data

      // Add account_no to the mock response data
      const modifiedMockData = {
        ...mockResponse.data,
        account_no: documentData?.id_number || null
      }

      return mockResponse.success
        ? ResponseHelper.customSuccess(
            res,
            modifiedMockData,
            mockResponse.message,
            mockResponse.status_code,
            apiId
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

module.exports = BankVerificationController

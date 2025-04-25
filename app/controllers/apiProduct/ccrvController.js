const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const MOCK_RESPONSES = require('../../utils/mockData')

// Create a modified version of processDocumentAndUpdateBalance that doesn't deduct wallet
// This is a temporary function for checking status without deducting balance
async function checkStatusWithoutDeducting({
  apiDetails,
  documentData,
  clientId
}) {
  try {
    console.log('Checking status without deducting wallet:', {
      documentData,
      apiDetails,
      clientId
    })

    // Extract API details
    const documentType = apiDetails.documentType
    const vendorName = apiDetails.vendorId.name

    // Create a DocumentService instance and make the API call without wallet deduction
    const DocumentService = require('../../services/documentService.js')
    const documentService = new DocumentService(vendorName)
    const result = await documentService.verifyDocument(
      documentType,
      documentData
    )

    console.log('API Status Check Response:', result)

    const apiResponse = result.data
    const statusCode = result.status

    return { statusCode, apiResponse }
  } catch (error) {
    console.error('Error checking document status:', error)
    throw error
  }
}

class ccrvController {
  static async generateCCRVRequest(req, res) {
    let documentType
    try {
      const { apiId, documentData } = req.body
      const { bcaId: clientId } = req.user

      const apiDetails = await APIService.getAPIDetails(apiId)
      console.log('api details:', apiDetails)
      documentType = apiDetails.documentType

      // Call the initial API to get transaction_id
      const { statusCode, apiResponse } =
        await APIService.processDocumentAndUpdateBalance({
          apiDetails,
          documentData,
          clientId
        })

      console.log('apiResponse controller:', apiResponse)

      // If we have a transaction_id, start polling for status using fetchCCRVRequest
      if (apiResponse.transaction_id) {
        const fetchApiId = '680b453aaf033a39cd7c7021'
        const fetchDocumentData = {
          referenceId: apiResponse.transaction_id
        }

        // Get API details for fetch
        const fetchApiDetails = await APIService.getAPIDetails(fetchApiId)
        console.log('fetch api details:', fetchApiDetails)

        // Start polling process
        let pollAttempts = 0
        const maxAttempts = 30
        const intervalMs = 5000
        let finalResponse

        while (pollAttempts < maxAttempts) {
          try {
            // Check status WITHOUT deducting wallet
            const fetchResult = await checkStatusWithoutDeducting({
              apiDetails: fetchApiDetails,
              documentData: fetchDocumentData,
              clientId
            })

            finalResponse = fetchResult.apiResponse

            console.log(
              `Polling attempt ${pollAttempts + 1} - response:`,
              finalResponse
            )

            // Check if the status is COMPLETED
            if (finalResponse && finalResponse.ccrv_status === 'COMPLETED') {
              // Now that we have COMPLETED status, process the actual call to deduct wallet
              const finalResult =
                await APIService.processDocumentAndUpdateBalance({
                  apiDetails: fetchApiDetails,
                  documentData: fetchDocumentData,
                  clientId
                })

              return ResponseHelper.success(
                res,
                finalResult.apiResponse,
                `${fetchApiDetails.documentType} Verification completed successfully`,
                finalResult.statusCode
              )
            }
          } catch (error) {
            console.error(
              `Error in polling attempt ${pollAttempts + 1}:`,
              error
            )
            // Continue polling on error - don't exit the loop
          }

          // Wait for the interval before trying again
          await new Promise((resolve) => setTimeout(resolve, intervalMs))
          pollAttempts++
        }

        // If we've reached here, polling timed out
        return ResponseHelper.success(
          res,
          finalResponse || {
            message: 'Polling timed out',
            ccrv_status: 'PENDING'
          },
          `Verification initiated but not completed within timeout`,
          202
        )
      }

      // If no transaction_id, return the original response
      return ResponseHelper.success(
        res,
        apiResponse,
        `${documentType} Verification successful`,
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

  static async generateCCRVRequestTest(req, res) {
    try {
      const { documentData } = req.body

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? MOCK_RESPONSES.generate_ccrv_request.success.data
        : MOCK_RESPONSES.generate_ccrv_request.failure.data

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

  static async fecthCCRVRequest(req, res) {
    let documentType
    try {
      const { apiId, documentData } = req.body
      const { bcaId: clientId } = req.user

      const apiDetails = await APIService.getAPIDetails(apiId)
      console.log('api details:', apiDetails)
      documentType = apiDetails.documentType

      const { statusCode, apiResponse } =
        await APIService.processDocumentAndUpdateBalance({
          apiDetails,
          documentData,
          clientId
        })

      console.log('apiResponse controller:', apiResponse)

      return ResponseHelper.success(
        res,
        apiResponse,
        `${documentType} Verification successful`,
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

  static async fecthCCRVRequestTest(req, res) {
    try {
      const { documentData } = req.body

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? MOCK_RESPONSES.verify_ccrv_request.success.data
        : MOCK_RESPONSES.verify_ccrv_request.failure.data

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

module.exports = ccrvController

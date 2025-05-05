const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const EmploymentHistoryController = require('./employmentHistroyController.js')
const PANToUANController = require('./panToUANController.js')
const VerifyUANWithAadhaarController = require('./aadhaarToUanController.js')

class EmploymentCompositeController {
  static async verifyEmployment(req, res) {
    try {
      const { documentData } = req.body

      if (!documentData) {
        return ResponseHelper.validationError(res, {
          error: 'Invalid request. documentData is required'
        })
      }

      const { uan_number, pan_number, aadhaar_number } = documentData

      // Validate at least one identification number is provided
      if (!uan_number && !pan_number && !aadhaar_number) {
        return ResponseHelper.validationError(res, {
          error:
            'Invalid request. At least one of uan_number, pan_number, or aadhaar_number must be provided'
        })
      }

      // Create a proxy response object to capture the response from API calls
      const proxyRes = {
        status: function (code) {
          this.statusCode = code
          return this
        },
        json: function (data) {
          this.responseData = data
          return data
        }
      }

      // Define hardcoded API IDs for each service
      const API_IDS = {
        EMPLOYMENT_HISTORY: '675bcdcf9d8de038d8df26d9',
        PAN_TO_UAN: '675be3dc9d8de038d8df26e0',
        AADHAAR_TO_UAN: '675fc8da9d8de038d8df26eb'
      }

      // Case 1: If UAN is provided, directly proceed with employment verification
      if (uan_number) {
        const employmentRequestBody = {
          apiId: API_IDS.EMPLOYMENT_HISTORY,
          documentData: {
            id_number: uan_number
          }
        }

        const modifiedReq = { ...req, body: employmentRequestBody }
        return await EmploymentHistoryController.verifyEmploymentHistory(
          modifiedReq,
          res
        )
      }

      // Case 2: If PAN is provided, try to get UAN from PAN
      if (pan_number) {
        try {
          const panRequestBody = {
            apiId: API_IDS.PAN_TO_UAN,
            documentData: {
              id_number: pan_number
            }
          }

          const panReq = { ...req, body: panRequestBody }
          await PANToUANController.verifyUANWithPAN(panReq, proxyRes)

          // If PAN to UAN was successful, proceed with employment verification
          if (
            proxyRes.responseData.success &&
            proxyRes.responseData.data &&
            proxyRes.responseData.data.uan_number
          ) {
            const uanFromPan = proxyRes.responseData.data.uan_number

            const employmentReqWithPanUan = {
              ...req,
              body: {
                apiId: API_IDS.EMPLOYMENT_HISTORY,
                documentData: {
                  id_number: uanFromPan
                }
              }
            }

            return await EmploymentHistoryController.verifyEmploymentHistory(
              employmentReqWithPanUan,
              res
            )
          }

          // If PAN verification failed and Aadhaar is not available, return the PAN error
          if (!aadhaar_number) {
            return ResponseHelper.error(
              res,
              'Unable to retrieve UAN from PAN',
              proxyRes.statusCode || 400,
              proxyRes.responseData
            )
          }
          // If PAN fails and Aadhaar is available, we'll fall through to the Aadhaar case below
        } catch (error) {
          // If PAN verification fails with an exception and Aadhaar is not available, return the error
          if (!aadhaar_number) {
            throw error
          }
          // If error occurs but Aadhaar is available, we'll continue to the Aadhaar case
          console.error(
            'Error in PAN to UAN verification, trying Aadhaar:',
            error
          )
        }
      }

      // Case 3: Try with Aadhaar (either as first option or after PAN failed)
      if (aadhaar_number) {
        const aadhaarRequestBody = {
          apiId: API_IDS.AADHAAR_TO_UAN,
          documentData: {
            id_number: aadhaar_number
          }
        }

        const aadhaarReq = { ...req, body: aadhaarRequestBody }
        await VerifyUANWithAadhaarController.VerifyUANWithAadhaar(
          aadhaarReq,
          proxyRes
        )

        // Check if the response was successful and contains a UAN number
        if (
          !proxyRes.responseData.success ||
          !proxyRes.responseData.data ||
          !proxyRes.responseData.data.uan_number
        ) {
          return ResponseHelper.error(
            res,
            'Unable to retrieve UAN from Aadhaar',
            proxyRes.statusCode || 400,
            proxyRes.responseData
          )
        }

        // Now call employment history verification with the UAN
        const uanFromAadhaar = proxyRes.responseData.data.uan_number

        const employmentReqWithAadhaarUan = {
          ...req,
          body: {
            apiId: API_IDS.EMPLOYMENT_HISTORY,
            documentData: {
              id_number: uanFromAadhaar
            }
          }
        }

        return await EmploymentHistoryController.verifyEmploymentHistory(
          employmentReqWithAadhaarUan,
          res
        )
      }

      // This code should not be reached if validation is done correctly, but adding as a safeguard
      return ResponseHelper.validationError(res, {
        error:
          'No valid identification provided. Please provide uan_number, pan_number, or aadhaar_number'
      })
    } catch (error) {
      console.error('Error in composite employment verification:', error)

      if (error instanceof BaseError) {
        return ResponseHelper.error(
          res,
          error.message || 'Employment verification failed',
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
        error.message || 'Employment verification failed',
        error.status || 500,
        {
          error: error.message,
          stack:
            process.env.NODE_ENV === 'development' ? error.stack : undefined
        }
      )
    }
  }

  static async verifyEmploymentTest(req, res) {
    try {
      const { documentData } = req.body

      if (!documentData) {
        return ResponseHelper.validationError(res, {
          error: 'Invalid request. documentData is required'
        })
      }

      const { uan_number, pan_number, aadhaar_number } = documentData

      // Validate at least one identification number is provided
      if (!uan_number && !pan_number && !aadhaar_number) {
        return ResponseHelper.validationError(res, {
          error:
            'Invalid request. At least one of uan_number, pan_number, or aadhaar_number must be provided'
        })
      }

      // Create a proxy response object to capture responses
      const proxyRes = {
        status: function (code) {
          this.statusCode = code
          return this
        },
        json: function (data) {
          this.responseData = data
          return data
        }
      }

      // Define hardcoded API IDs for each service (test mode)
      const API_IDS = {
        EMPLOYMENT_HISTORY: '675bcdcf9d8de038d8df26d9',
        PAN_TO_UAN: '675be3dc9d8de038d8df26e0',
        AADHAAR_TO_UAN: '675fc8da9d8de038d8df26eb'
      }

      // Case 1: If UAN is provided, directly proceed with employment verification
      if (uan_number) {
        req.body.apiId = API_IDS.EMPLOYMENT_HISTORY
        req.body.documentData = {
          id_number: uan_number
        }

        return await EmploymentHistoryController.verifyEmploymentHistoryTest(
          req,
          res
        )
      }

      // Case 2: If PAN is provided, try to get UAN from PAN
      if (pan_number) {
        try {
          req.body.apiId = API_IDS.PAN_TO_UAN
          req.body.documentData = {
            id_number: pan_number
          }

          await PANToUANController.verifyUANWithPANTest(req, proxyRes)

          // If PAN to UAN was successful, proceed with employment verification
          if (
            proxyRes.responseData.success &&
            proxyRes.responseData.data &&
            proxyRes.responseData.data.uan_number
          ) {
            req.body.apiId = API_IDS.EMPLOYMENT_HISTORY
            req.body.documentData = {
              id_number: proxyRes.responseData.data.uan_number
            }

            return await EmploymentHistoryController.verifyEmploymentHistoryTest(
              req,
              res
            )
          }

          // If PAN verification failed and Aadhaar is not available, return the PAN error
          if (!aadhaar_number) {
            return ResponseHelper.error(
              res,
              'Unable to retrieve UAN from PAN',
              proxyRes.statusCode || 400,
              proxyRes.responseData
            )
          }
          // If PAN fails and Aadhaar is available, we'll fall through to the Aadhaar case below
        } catch (error) {
          // If PAN verification fails with an exception and Aadhaar is not available, return the error
          if (!aadhaar_number) {
            throw error
          }
          // If error occurs but Aadhaar is available, we'll continue to the Aadhaar case
          console.error(
            'Error in PAN to UAN test verification, trying Aadhaar:',
            error
          )
        }
      }

      // Case 3: Try with Aadhaar (either as first option or after PAN failed)
      if (aadhaar_number) {
        req.body.apiId = API_IDS.AADHAAR_TO_UAN
        req.body.documentData = {
          id_number: aadhaar_number
        }

        await VerifyUANWithAadhaarController.VerifyUANWithAadhaarTest(
          req,
          proxyRes
        )

        // Check if the response was successful and contains a UAN number
        if (
          !proxyRes.responseData.success ||
          !proxyRes.responseData.data ||
          !proxyRes.responseData.data.uan_number
        ) {
          return ResponseHelper.error(
            res,
            'Unable to retrieve UAN from Aadhaar',
            proxyRes.statusCode || 400,
            proxyRes.responseData
          )
        }

        // Now call employment history verification with the UAN
        req.body.apiId = API_IDS.EMPLOYMENT_HISTORY
        req.body.documentData = {
          id_number: proxyRes.responseData.data.uan_number
        }

        return await EmploymentHistoryController.verifyEmploymentHistoryTest(
          req,
          res
        )
      }

      // This code should not be reached if validation is done correctly, but adding as a safeguard
      return ResponseHelper.validationError(res, {
        error:
          'No valid identification provided. Please provide uan_number, pan_number, or aadhaar_number'
      })
    } catch (error) {
      console.error('Error in composite employment verification test:', error)
      return ResponseHelper.serverError(res, error)
    }
  }
}

module.exports = EmploymentCompositeController

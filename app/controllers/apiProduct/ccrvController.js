const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const MOCK_RESPONSES = require('../../utils/mockData')
const CCRVVerification = require('../../models/ccrvVerification.js')

class ccrvController {
  static async ccrvGenerateRequest(req, res) {
    let documentType
    try {
      const { apiId, documentData } = req.body
      const { bcaId: clientId } = req.user
      const { name, fatherName, address, dateOfBirth } = req.body.documentData

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

      const verification = new CCRVVerification({
        name,
        fatherName,
        address,
        dateOfBirth,
        clientId, // Store clientId from the user object
        transactionId: apiResponse.transaction_id,
        status: apiResponse.ccrv_status
      })
      await verification.save()

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

  static async ccrvGenerateRequestTest(req, res) {
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

  /**
   * Handle verification callback from third-party API
   * This is the webhook endpoint that receives verification results
   */
  static async verificationCallback(req, res) {
    try {
      // Get the callback data from the request body
      const callbackData = req.body.data

      // Validate that we have the transaction ID in the callback data
      if (!callbackData || !callbackData.transaction_id) {
        console.error('Invalid callback data received:', req.body)
        // Still return 200 to acknowledge receipt as per third-party requirements
        return ResponseHelper.success(
          res,
          null,
          'Invalid callback data, but acknowledged receipt',
          200
        )
      }

      const transactionId = callbackData.transaction_id

      // Find the verification request by transaction ID
      const verification = await CCRVVerification.findOne({ transactionId })

      // If no verification found, log the error but still return 200 to acknowledge receipt
      if (!verification) {
        console.error(
          `No verification found for transaction ID: ${transactionId}`
        )
        // We still return 200 as mentioned in the requirements
        return ResponseHelper.success(
          res,
          { transactionId },
          'Verification not found, but acknowledged receipt',
          200
        )
      }

      // Update the verification with the callback data
      verification.callbackReceived = true
      verification.callbackTimestamp = new Date()
      verification.status = callbackData.ccrv_status || 'COMPLETED'
      verification.callbackData = callbackData

      await verification.save()

      // Return 200 to acknowledge successful receipt (as per third-party requirements)
      return ResponseHelper.success(
        res,
        { transactionId },
        'Callback received successfully',
        200
      )
    } catch (error) {
      console.error('Error processing CCRV verification callback:', error)
      // Still return 200 to avoid triggering retries unnecessarily
      return ResponseHelper.success(
        res,
        null,
        'Error processing callback, but acknowledged receipt',
        200
      )
    }
  }

  /**
   * Get the status of a verification request by transaction ID
   */
  static async getVerificationStatus(req, res) {
    try {
      const { transactionId } = req.params

      // Check if we're in development mode and should return mock data
      if (process.env.NODE_ENV === 'development') {
        // Return mock data for development testing
        const mockData = {
          transactionId,
          status: 'COMPLETED',
          requestTimestamp: new Date(Date.now() - 3600000), // 1 hour ago
          callbackReceived: true,
          callbackTimestamp: new Date(),
          result: {
            code: '1019',
            message: 'CCRV result fetched for an individual.',
            transaction_id: transactionId,
            ccrv_status: 'COMPLETED',
            ccrv_data: {
              case_count: 1,
              cases: [
                {
                  algorithm_risk: 'average risk',
                  father_match_type: 'PARTIAL_EXACT',
                  name_match_type: 'EXACT_MATCH',
                  case_id:
                    'af1e6bdcbccb35dc8f899b1ebefe6e5d_23ad1dc65d4edd0ccbf1bb771607a154',
                  case_type_name: 'PMLA MA',
                  link: 'https://verify24x7.in/live/casehtml3.php?link=https%3A%2F%2Ffullhtml2.s3-us-west-2.amazonaws.com%2Faf1e6bdcbccb35dc8f899b1ebef',
                  md5: 'af1e6bdcbccb35dc8f899b1ebefe6e5d_23ad1dc65d4edd0ccbf1bb771607a154',
                  unique_case_id: '10c0fffabb8f3b9e2c4a9ca36a067c7a',
                  case_category: 'criminal',
                  case_decision_date: '04th July 2017',
                  case_number: '214101008402017',
                  case_status: 'CASE DISPOSED',
                  case_type: 'PMLA MA',
                  case_year: '2017',
                  cnr: 'MHCC020149422017',
                  decision_date: '04th July 2017',
                  district_name: 'Mumbai City Civil Court',
                  filing_date: '04-07-2017',
                  filing_number: '108094/2017',
                  filing_year: '2017',
                  first_hearing_date: '04th July 2017',
                  name: 'John Doe',
                  nature_of_disposal: 'Contested--DISPOSSED OFF',
                  oparty: 'Directorate of Enforcement Through Vipin Nair',
                  registration_date: '04-07-2017',
                  registration_number: '100840/2017',
                  registration_year: '2017',
                  source: 'ecourt',
                  state_name: 'Maharashtra',
                  type: 1,
                  under_acts: 'Prevention of Money Laundering Act-2002',
                  under_sections: '3,4'
                }
              ]
            }
          }
        }

        return ResponseHelper.success(
          res,
          mockData,
          'Mock verification status retrieved successfully',
          200
        )
      }

      // Validate transaction ID
      if (!transactionId) {
        return ResponseHelper.error(res, 'Transaction ID is required', 400)
      }

      // Find the verification by transaction ID
      const verification = await CCRVVerification.findOne({ transactionId })

      // If no verification found, return 404
      if (!verification) {
        return ResponseHelper.error(res, 'Verification not found', 404)
      }

      // Prepare response data
      const responseData = {
        transactionId: verification.transactionId,
        status: verification.status,
        requestTimestamp: verification.createdAt,
        callbackReceived: verification.callbackReceived,
        callbackTimestamp: verification.callbackTimestamp,
        // Include the CCRV data if available
        result: verification.callbackReceived ? verification.callbackData : null
      }

      // Return the verification status and data
      return ResponseHelper.success(
        res,
        responseData,
        'Verification status retrieved successfully',
        200
      )
    } catch (error) {
      console.error('Error fetching verification status:', error)

      if (error instanceof BaseError) {
        return ResponseHelper.error(res, error.message, error.statusCode, error)
      }

      return ResponseHelper.serverError(res, error)
    }
  }

  /**
   * Get all CCRV verification requests for a client with pagination using mongoose-paginate-v2
   */
  static async getAllCcrv(req, res) {
    try {
      const { bcaId: clientId } = req.user
      const {
        page = 1,
        limit = 10,
        status,
        fromDate,
        toDate,
        search
      } = req.query

      // Check if we're in development mode and should return mock data
      if (process.env.NODE_ENV === 'development') {
        // Generate mock data with pagination
        const mockTotalCount = 35 // Mock total number of records
        const totalPages = Math.ceil(mockTotalCount / limit)

        // Generate mock records
        const mockRecords = Array.from(
          {
            length: Math.min(
              parseInt(limit),
              mockTotalCount - (parseInt(page) - 1) * parseInt(limit)
            )
          },
          (_, i) => {
            const index = (parseInt(page) - 1) * parseInt(limit) + i + 1
            const isComplete = Math.random() > 0.3 // 70% chance of being complete

            return {
              _id: `mock_id_${index}`,
              name: `Test User ${index}`,
              fatherName: `Father ${index}`,
              address: `Address ${index}, Mumbai`,
              transactionId: `mock_transaction_${index}`,
              status: isComplete
                ? 'COMPLETED'
                : ['REQUESTED', 'PROCESSING'][Math.floor(Math.random() * 2)],
              callbackReceived: isComplete,
              createdAt: new Date(
                Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
              ), // Random date within last week
              callbackTimestamp: isComplete
                ? new Date(
                    Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)
                  )
                : null
            }
          }
        )

        // Return paginated mock data
        return ResponseHelper.success(
          res,
          {
            records: mockRecords,
            pagination: {
              total: mockTotalCount,
              page: parseInt(page),
              limit: parseInt(limit),
              totalPages
            }
          },
          'Mock CCRV verification records retrieved successfully',
          200
        )
      }

      // Build query based on filters
      const query = { clientId }

      // Add status filter if provided
      if (status) {
        query.status = status
      }

      // Add date range filter if provided
      if (fromDate || toDate) {
        query.createdAt = {}
        if (fromDate) {
          query.createdAt.$gte = new Date(fromDate)
        }
        if (toDate) {
          // Add one day to include the entire day
          const endDate = new Date(toDate)
          endDate.setDate(endDate.getDate() + 1)
          query.createdAt.$lt = endDate
        }
      }

      // Add text search if provided
      if (search) {
        // Create a text search query across relevant fields
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { fatherName: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } },
          { transactionId: { $regex: search, $options: 'i' } }
        ]
      }

      // Configure pagination options
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 }, // Most recent first
        lean: true // Convert to plain JavaScript objects for better performance
      }

      // Execute paginated query using mongoose-paginate-v2
      const result = await CCRVVerification.paginate(query, options)

      // Format the pagination result
      const paginationResult = {
        records: result.docs,
        pagination: {
          total: result.totalDocs,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
          hasPrevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          prevPage: result.prevPage,
          nextPage: result.nextPage
        }
      }

      // Return paginated data
      return ResponseHelper.success(
        res,
        paginationResult,
        'CCRV verification records retrieved successfully',
        200
      )
    } catch (error) {
      console.error('Error fetching CCRV verification records:', error)

      if (error instanceof BaseError) {
        return ResponseHelper.error(res, error.message, error.statusCode, error)
      }

      return ResponseHelper.serverError(res, error)
    }
  }
}

module.exports = ccrvController

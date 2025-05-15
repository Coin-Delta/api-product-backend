const ResponseHelper = require('../../utils/responseHelper')
const APIService = require('../../services/apiService.js')
const BaseError = require('../../utils/error/baseError.js')
const MOCK_RESPONSES = require('../../utils/mockData')
const CCRVVerification = require('../../models/ccrvVerification.js')
const TransactionService = require('../../services/transactionService.js')
const WalletService = require('../../services/walletService.js')
const {
  TRANSACTION_STATUS_TYPES
} = require('../../constants/transactionStatusTypes.js')
const { TRANSACTION_TYPES } = require('../../constants/transactionTypes.js')
const mongoose = require('mongoose')

class ccrvController {
  /**
   * Enhanced CCRV request method that handles both generation and result fetch with polling
   * This combines the functionality of ccrvGenerateRequest and ccrvFetchRequest
   */
  static async ccrvUnifiedRequest(req, res) {
    let documentType
    let generateApiDetails
    let fetchApiDetails
    let verification

    try {
      const {
        apiId,
        documentData,
        pollingTimeoutSeconds = 30,
        pollingIntervalMs = 10000
      } = req.body
      const { bcaId: clientId } = req.user
      const { name, fatherName, address, dateOfBirth } = req.body.documentData

      // Step 1: Get API details for generate request
      generateApiDetails = await APIService.getAPIDetails(apiId)
      console.log('Generate API details:', generateApiDetails)
      documentType = generateApiDetails.documentType

      // Step 2: Get API details for fetch request (we need this for proper pricing)
      // This assumes you have a way to get the related fetch API or a fixed ID
      // You might need to adjust this logic based on how your APIs are related
      const fetchApiId = '680b453aaf033a39cd7c7021' // The ID of the CCRV_VERIFY_REQUEST API
      fetchApiDetails = await APIService.getAPIDetails(fetchApiId)

      // Step 3: Check wallet balance with the FETCH price (as that's what we'll actually charge)
      const price = fetchApiDetails.price
      const wallet = await WalletService.getWalletAndCheckBalance(
        clientId,
        price
      )

      // Step 4: Make the initial generate request
      const { statusCode, apiResponse } =
        await APIService.processDocumentAndUpdateBalance({
          apiDetails: generateApiDetails,
          documentData,
          clientId
        })

      console.log('Initial API Response:', apiResponse)

      if (!apiResponse.transaction_id) {
        throw new BaseError(
          'Failed to get transaction ID from initial request',
          400
        )
      }

      // Step 5: Create verification record
      verification = new CCRVVerification({
        name,
        fatherName,
        address,
        dateOfBirth,
        clientId,
        transactionId: apiResponse.transaction_id,
        status: apiResponse.ccrv_status
      })
      await verification.save()

      // Step 6: Start polling for results
      const startTime = Date.now()
      const maxEndTime = startTime + pollingTimeoutSeconds * 1000
      let finalResult = null
      let isCompleted = false

      while (Date.now() < maxEndTime && !isCompleted) {
        // Wait for the polling interval before trying again
        await new Promise((resolve) => setTimeout(resolve, pollingIntervalMs))

        // Make the fetch request
        try {
          const fetchResult = await APIService.processDocumentAndUpdateBalance({
            apiDetails: fetchApiDetails,
            documentData: {
              reference_id: apiResponse.transaction_id
            },
            clientId,
            // Don't deduct balance yet - this is just for checking status
            skipWalletDeduction: true
          })

          console.log('Poll result:', fetchResult.apiResponse)

          // Check if completed
          if (
            fetchResult.apiResponse &&
            fetchResult.apiResponse.ccrv_status === 'COMPLETED'
          ) {
            finalResult = fetchResult
            isCompleted = true

            // Update verification record
            verification.status = 'COMPLETED'
            verification.callbackReceived = true
            verification.callbackTimestamp = new Date()
            verification.callbackData = fetchResult.apiResponse
            await verification.save()
          }
        } catch (pollError) {
          // Log error but continue polling
          console.error('Polling error (continuing):', pollError)
        }
      }

      // Step 7: Process payment if we got a completed result
      if (isCompleted && finalResult) {
        // Now deduct the wallet and create the transaction
        const session = await mongoose.startSession()
        try {
          session.startTransaction()

          // Deduct wallet amount
          const updatedWallet = await WalletService.changeWallet(
            {
              clientId,
              price,
              transactionType: TRANSACTION_TYPES.DEBIT
            },
            session
          )

          // Create transaction log
          await TransactionService.createTransaction(
            {
              clientId,
              price,
              transactionType: TRANSACTION_TYPES.DEBIT,
              status: TRANSACTION_STATUS_TYPES.SUCCESS,
              apiId: fetchApiDetails._id,
              vendorId: fetchApiDetails.vendorId._id,
              requestData: {
                name,
                fatherName,
                address,
                dateOfBirth,
                reference_id: apiResponse.transaction_id
              },
              responseData: finalResult.apiResponse,
              httpStatus: finalResult.statusCode,
              afterBalance: updatedWallet.balance,
              remark: `CCRV Verification Successful - Cases Found: ${
                finalResult.apiResponse.ccrv_data?.case_count || 0
              }`,
              completedAt: Date.now()
            },
            session
          )

          await session.commitTransaction()
          console.log(
            `Payment processed for transaction ID: ${apiResponse.transaction_id}`
          )
          const apiId = fetchApiDetails._id
          // Return the complete response
          return ResponseHelper.customSuccess(
            res,
            finalResult.apiResponse,
            `${documentType} Verification successful`,
            finalResult.statusCode,
            apiId
          )
        } catch (txError) {
          await session.abortTransaction()
          console.error('Transaction error:', txError)
          throw txError
        } finally {
          session.endSession()
        }
      } else {
        // If we timed out, return the status as is with the last known state
        const statusMessage = isCompleted
          ? `${documentType} Verification successful`
          : `${documentType} Verification in progress - please check status later`

        // In case of timeout, we'll return the original apiResponse with proper status
        return ResponseHelper.customSuccess(
          res,
          {
            ...apiResponse,
            _timeoutOccurred: !isCompleted,
            _statusMessage: statusMessage
          },
          statusMessage,
          isCompleted ? 200 : 202, // Use 202 Accepted for in-progress,
          apiId
        )
      }
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
      return ResponseHelper.serverError(res, error)
    }
  }

  static async ccrvUnifiedRequestTest(req, res) {
    try {
      const { documentData } = req.body
      console.log('user:', req.user)

      // Return success or failure mock response based on whether documentData is provided
      const mockResponse = documentData
        ? MOCK_RESPONSES.verify_ccrv_request.success.data
        : MOCK_RESPONSES.verify_ccrv_request.failure.data
      const apiId = req.body.apiId
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
      return ResponseHelper.serverError(res, error)
    }
  }

  // Keep existing methods for backward compatibility
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
          apiDetails,
          documentData,
          clientId
        })

      console.log('apiResponse controller:', apiResponse)

      const verification = new CCRVVerification({
        name,
        fatherName,
        address,
        dateOfBirth,
        clientId,
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

  static async ccrvFetchRequest(req, res) {
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

      // If we're in production and the status is COMPLETED, process the payment
      if (process.env.NODE_ENV === 'production') {
        try {
          const clientId = verification.clientId
          const price = 70 // Fixed price for this service

          // Check if the user has sufficient balance
          const wallet = await WalletService.getWalletAndCheckBalance(
            clientId,
            price
          )

          // Check if the verification was successful based on the callback data
          const isSuccessful = callbackData.ccrv_status === 'COMPLETED'

          if (isSuccessful) {
            // Deduct wallet and create success transaction
            const session = await mongoose.startSession()
            try {
              session.startTransaction()

              // Deduct wallet amount
              const updatedWallet = await WalletService.changeWallet(
                {
                  clientId,
                  price,
                  transactionType: TRANSACTION_TYPES.DEBIT
                },
                session
              )

              // Create transaction log with SUCCESS status
              await TransactionService.createTransaction(
                {
                  clientId,
                  price,
                  transactionType: TRANSACTION_TYPES.DEBIT,
                  status: TRANSACTION_STATUS_TYPES.SUCCESS,
                  apiId: null, // You'll need to store the API ID in the verification model if needed
                  vendorId: null, // Same for vendor ID
                  requestData: {
                    name: verification.name,
                    fatherName: verification.fatherName,
                    address: verification.address,
                    dateOfBirth: verification.dateOfBirth
                  },
                  responseData: callbackData,
                  httpStatus: 200,
                  afterBalance: updatedWallet.balance,
                  remark: `CCRV Verification Successful - Cases Found: ${
                    callbackData.ccrv_data?.case_count || 0
                  }`,
                  completedAt: Date.now()
                },
                session
              )

              await session.commitTransaction()
              console.log(
                `Successfully processed payment for transaction ID: ${transactionId}`
              )
            } catch (error) {
              await session.abortTransaction()
              console.error('Error processing payment:', error)
            } finally {
              session.endSession()
            }
          } else {
            // Log transaction with FAILURE status but don't deduct wallet
            await TransactionService.createTransaction({
              clientId,
              price: 0, // No charge for failed verification
              transactionType: TRANSACTION_TYPES.DEBIT,
              status: TRANSACTION_STATUS_TYPES.FAILURE,
              requestData: {
                name: verification.name,
                fatherName: verification.fatherName,
                address: verification.address,
                dateOfBirth: verification.dateOfBirth
              },
              responseData: callbackData,
              httpStatus: 200,
              afterBalance: wallet.balance,
              remark: `CCRV Verification Failed - Code: ${callbackData.code}, Status: ${callbackData.ccrv_status}`,
              completedAt: Date.now()
            })
          }
        } catch (error) {
          console.error('Error processing payment for verification:', error)
          // Don't throw here as we still want to return 200 to the third-party
        }
      }

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
      if (
        process.env.NODE_ENV === 'development' ||
        (process.env.NODE_ENV === 'production' && req.user.useMockData)
      ) {
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
      if (
        process.env.NODE_ENV === 'development' ||
        (process.env.NODE_ENV === 'production' && req.user.useMockData)
      ) {
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

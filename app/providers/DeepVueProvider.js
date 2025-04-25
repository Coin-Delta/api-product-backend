const BaseProvider = require('./baseProvider')
const axios = require('axios')
const { DOCUMENT_TYPES } = require('../constants/documentTypes.js')

// Authentication types
const AUTH_TYPES = {
  TOKEN_API_KEY: 'token_api_key', // Uses Bearer token + x-api-key
  CLIENT_ID_API_KEY: 'client_id_api_key', // Uses client-id + x-api-key
  API_KEY_ONLY: 'api_key_only' // Uses only x-api-key
}

class DeepVueProvider extends BaseProvider {
  constructor(config) {
    super(config)
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
    this.accessToken = null
    this.tokenExpiry = null
  }

  getEndpoints() {
    return {
      [DOCUMENT_TYPES.DIN_VERIFICATION]: '/verification/mca/din',
      [DOCUMENT_TYPES.AADHAAR_DETAILED_GENERATE_OTP]:
        '/ekyc/aadhaar/generate-otp',
      [DOCUMENT_TYPES.AADHAAR_DETAILED_VERIFY_OTP]: '/ekyc/aadhaar/verify-otp',
      [DOCUMENT_TYPES.FSSAI_VERIFICATION]:
        '/business-compliance/fssai-verification',
      [DOCUMENT_TYPES.GST_VERIFICATION_ADVANCE]: '/verification/gstin-advanced',
      [DOCUMENT_TYPES.TAN_VERIFICATION]: '/verification/tax-payer/tan',
      [DOCUMENT_TYPES.PAN_ADVANCE_VERIFICATION]: '/verification/pan-plus',
      [DOCUMENT_TYPES.PAN_UDYAM_MSME_STATUS]: '/verification/pan-msme-check',
      [DOCUMENT_TYPES.CREDIT_REPORT_V2]:
        '/financial-services/credit-bureau/credit-report'
      // Add other document types as needed by DeepVue
    }
  }

  // Configuration for endpoints with their base URL and authentication type
  getEndpointConfig(documentType) {
    // Default configuration for standard endpoints
    const defaultConfig = {
      baseUrl: this.baseUrl,
      authType: AUTH_TYPES.TOKEN_API_KEY
    }

    // Specific configurations for endpoints with different requirements
    const specificConfigs = {
      // V2 endpoints with client-id + x-api-key auth
      [DOCUMENT_TYPES.AADHAAR_DETAILED_GENERATE_OTP]: {
        baseUrl: process.env.DEEPVUE_BASE_URL_V2,
        authType: AUTH_TYPES.CLIENT_ID_API_KEY
      },
      [DOCUMENT_TYPES.AADHAAR_DETAILED_VERIFY_OTP]: {
        baseUrl: process.env.DEEPVUE_BASE_URL_V2,
        authType: AUTH_TYPES.CLIENT_ID_API_KEY
      },
      [DOCUMENT_TYPES.PAN_ADVANCE_VERIFICATION]: {
        baseUrl: process.env.DEEPVUE_BASE_URL_V2,
        authType: AUTH_TYPES.TOKEN_API_KEY
      },
      [DOCUMENT_TYPES.CREDIT_REPORT_V2]: {
        baseUrl: process.env.DEEPVUE_BASE_URL_V2,
        authType: AUTH_TYPES.TOKEN_API_KEY
      }

      // V2 endpoints with token + x-api-key auth
      // Add any V2 endpoints that need token authentication here
      // Example:
      // [DOCUMENT_TYPES.SOME_V2_ENDPOINT_WITH_TOKEN]: {
      //   baseUrl: process.env.DEEPVUE_BASE_URL_V2,
      //   authType: AUTH_TYPES.TOKEN_API_KEY
      // },

      // Regular endpoints with only x-api-key auth (if any)
      // Example:
      // [DOCUMENT_TYPES.SOME_ENDPOINT_WITH_ONLY_API_KEY]: {
      //   baseUrl: this.baseUrl,
      //   authType: AUTH_TYPES.API_KEY_ONLY
      // }
    }

    // Return specific config if exists, otherwise default
    return specificConfigs[documentType] || defaultConfig
  }

  async getAuthToken() {
    try {
      // Check if we have a valid token
      if (
        this.accessToken &&
        this.tokenExpiry &&
        new Date() < new Date(this.tokenExpiry)
      ) {
        return this.accessToken
      }

      // Get a new token
      const response = await axios({
        method: 'POST',
        url: `${this.baseUrl}/authorize`,
        data: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: this.timeout
      })

      if (response.data && response.data.access_token) {
        this.accessToken = response.data.access_token
        this.tokenExpiry = response.data.expiry
        return this.accessToken
      } else {
        throw new Error('Failed to obtain authentication token')
      }
    } catch (error) {
      console.error('Error getting DeepVue auth token:', error.message)
      throw error
    }
  }

  // Get headers based on authentication type
  getHeaders(authType) {
    const baseHeaders = super.getHeaders()

    switch (authType) {
      case AUTH_TYPES.TOKEN_API_KEY:
        return {
          ...baseHeaders,
          Authorization: `Bearer ${this.accessToken}`,
          'x-api-key': this.clientSecret
        }

      case AUTH_TYPES.CLIENT_ID_API_KEY:
        return {
          ...baseHeaders,
          'client-id': this.clientId,
          'x-api-key': this.clientSecret
        }

      case AUTH_TYPES.API_KEY_ONLY:
        return {
          ...baseHeaders,
          'x-api-key': this.clientSecret
        }

      default:
        return baseHeaders
    }
  }

  // Build request URL and parameters based on document type
  buildRequestConfig(documentType, data, baseUrl, endpoint) {
    let url = `${baseUrl}${endpoint}`
    let method = 'POST' // Default method
    let requestData = { ...data } // Default to using all provided data

    // Configure endpoint-specific request parameters
    switch (documentType) {
      case DOCUMENT_TYPES.DIN_VERIFICATION:
        url = `${url}?id_number=${data.id_number}`
        method = 'GET'
        requestData = null
        break

      case DOCUMENT_TYPES.AADHAAR_DETAILED_GENERATE_OTP:
        url = `${url}?aadhaar_number=${data.id_number}&consent=${data.consent}&purpose=ForKYC`
        requestData = {} // Empty object instead of null as per docs
        break

      case DOCUMENT_TYPES.AADHAAR_DETAILED_VERIFY_OTP:
        url = `${url}?otp=${data.otp}&reference_id=${data.referenceId}&consent=${data.consent}&purpose=ForKYC&mobile_number=${data.mobileNumber}&generate_pdf=${data.generatePDF}`
        requestData = {} // Empty object instead of null as per docs
        break

      case DOCUMENT_TYPES.FSSAI_VERIFICATION:
        url = `${url}?fssai_id=${data.id_number}`
        method = 'GET'
        requestData = null
        break

      case DOCUMENT_TYPES.GST_VERIFICATION_ADVANCE:
        url = `${url}?gstin_number=${data.id_number}`
        method = 'GET'
        requestData = null
        break

      case DOCUMENT_TYPES.TAN_VERIFICATION:
        url = `${url}?tan_number=${data.id_number}`
        method = 'GET'
        requestData = null
        break
      case DOCUMENT_TYPES.PAN_ADVANCE_VERIFICATION:
        url = `${url}?pan_number=${data.id_number}`
        method = 'GET'
        requestData = null
      case DOCUMENT_TYPES.PAN_UDYAM_MSME_STATUS:
        url = `${url}?pan_number=${data.id_number}`
        method = 'GET'
        requestData = null
        break
      case DOCUMENT_TYPES.CREDIT_REPORT_V2:
        url = `${url}?full_name=${data.name}&id_number=${data.id_number}&mobile_number=${data.mobile}&gender=${data.gender}&consent=${data.consent}&purpose=${data.purpose}&generate_pdf=True`
        method = 'GET'
        requestData = null
        break

      // Add other specific cases as needed
    }

    return { url, method, requestData }
  }

  // Transform response to standard format
  transformResponse(response) {
    if (response.data.reference_id) {
      return {
        success: true,
        data: { referenceId: response.data.reference_id },
        status: response.data.code,
        message: response.data.message,
        remark: response.data.message
      }
    } else {
      return {
        success: true,
        data: response.data.data,
        status: response.data.code,
        remark: response.data.message
      }
    }
  }

  // Handle errors in standardized way
  handleError(error) {
    console.log('DeepVue provider error:', error.response?.data)
    console.log('DeepVue provider error status:', error.response?.status)

    return {
      success: false,
      error:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message,
      status: error.response?.status || error.status || 500,
      remark: error.response?.data?.message
    }
  }

  // Override the verify method from BaseProvider
  async verify(documentType, data) {
    this.validateDocumentType(documentType)

    try {
      // Get config for this endpoint
      const { baseUrl, authType } = this.getEndpointConfig(documentType)

      // Only get auth token if this endpoint requires token authentication
      if (authType === AUTH_TYPES.TOKEN_API_KEY) {
        await this.getAuthToken()
      }

      const endpoint = this.endpoints[documentType]

      // Build request configuration based on document type
      const { url, method, requestData } = this.buildRequestConfig(
        documentType,
        data,
        baseUrl,
        endpoint
      )

      // Get appropriate headers for this endpoint
      const headers = this.getHeaders(authType)

      console.log(`Making ${method} request to: ${url}`)
      console.log('With headers:', headers)
      console.log('Request data:', requestData)

      const response = await axios({
        method: method,
        url: url,
        data: method === 'POST' ? requestData : undefined,
        headers: headers,
        timeout: this.timeout
      })

      console.log('DeepVue Response:', response.data)

      // Transform DeepVue response to match standard format
      return this.transformResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }
}

module.exports = DeepVueProvider

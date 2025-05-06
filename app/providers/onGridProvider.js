// providers/onGridProvider.js
const BaseProvider = require('./baseProvider')
const axios = require('axios')
const ResponseTransformer = require('../utils/error/responseTransformer.js')
const { DOCUMENT_TYPES } = require('../constants/documentTypes.js')

class OnGridProvider extends BaseProvider {
  constructor(config) {
    super(config)
    this.apiKey = config.apiKey
  }

  getEndpoints() {
    return {
      [DOCUMENT_TYPES.EMPLOYMENT_HISTORY_ADVANCE]:
        '/epfo-api/employment-history/fetch-by-uan',
      [DOCUMENT_TYPES.CCRV_GENERATE_REQUEST]: '/ccrv-api/rapid/search',
      [DOCUMENT_TYPES.CCRV_VERIFY_REQUEST]: '/ccrv-api/rapid/result',
      [DOCUMENT_TYPES.EMPLOYMENT_HISTORY_BY_MOBILE]:
        '/epfo-api/employment-history/fetch-by-mobile'
      // Add more OnGrid endpoints as needed
    }
  }

  // Define endpoint configurations including method and how to transform the data
  getEndpointConfig(documentType) {
    // Default configuration
    const defaultConfig = {
      method: 'POST',
      requiresConsent: true,
      transformRequest: (data) => {
        return {
          ...this.mapIdNumberToCorrectField(documentType, data.id_number)
        }
      }
    }

    // Specific configurations for different document types
    const specificConfigs = {
      [DOCUMENT_TYPES.EMPLOYMENT_HISTORY_ADVANCE]: {
        method: 'POST',
        requiresConsent: true,
        transformRequest: (data) => {
          return {
            uan: data.id_number,
            consent: data.consent || 'Y'
          }
        }
      },
      [DOCUMENT_TYPES.EMPLOYMENT_HISTORY_BY_MOBILE]: {
        method: 'POST',
        requiresConsent: true,
        transformRequest: (data) => {
          return {
            mobile_number: data.mobile_number,
            consent: data.consent || 'Y'
          }
        }
      },
      [DOCUMENT_TYPES.CCRV_GENERATE_REQUEST]: {
        method: 'POST',
        requiresConsent: true,
        transformRequest: (data) => {
          return {
            name: data.name,
            father_name: data.father_name,
            address: data.address,
            date_of_birth: data.dateOfBirth,
            consent: 'Y'
          }
        }
      },
      [DOCUMENT_TYPES.CCRV_VERIFY_REQUEST]: {
        method: 'GET',
        requiresConsent: true,
        customHeaders: (data) => {
          return {
            'X-Transaction-ID': data.reference_id
          }
        }
      }
    }

    return specificConfigs[documentType] || defaultConfig
  }

  getHeaders(customHeaders = {}) {
    return {
      ...super.getHeaders(),
      'X-API-Key': this.apiKey,
      'X-Auth-Type': 'API-Key',
      Accept: 'application/json',
      ...customHeaders
    }
  }

  // Helper method to map id_number to the correct field based on document type
  mapIdNumberToCorrectField(documentType, idNumber) {
    const fieldMappings = {
      [DOCUMENT_TYPES.EMPLOYMENT_HISTORY_ADVANCE]: { uan: idNumber },
      [DOCUMENT_TYPES.EMPLOYMENT_HISTORY_BY_MOBILE]: { mobile_number: idNumber }
    }

    return fieldMappings[documentType] || { id_number: idNumber }
  }

  // Build request configuration based on document type
  buildRequestConfig(documentType, data) {
    const endpoint = this.endpoints[documentType]
    const config = this.getEndpointConfig(documentType)

    let url = `${this.baseUrl}${endpoint}`
    let method = config.method
    let requestData = null
    let headers = this.getHeaders()

    // Apply custom headers if specified
    if (config.customHeaders) {
      headers = {
        ...headers,
        ...config.customHeaders(data)
      }
    }

    // Transform request data if needed
    if (config.transformRequest) {
      requestData = config.transformRequest(data)
    }

    return {
      url,
      method,
      requestData,
      headers
    }
  }

  // Extract relevant data from response based on document type
  extractResponseData(documentType, responseData) {
    switch (documentType) {
      case DOCUMENT_TYPES.EMPLOYMENT_HISTORY_ADVANCE:
      case DOCUMENT_TYPES.EMPLOYMENT_HISTORY_BY_MOBILE:
        return responseData.data?.employment_data || responseData.data
      case DOCUMENT_TYPES.CCRV_GENERATE_REQUEST:
      case DOCUMENT_TYPES.CCRV_VERIFY_REQUEST:
        return responseData.data?.result || responseData.data
      default:
        return responseData.data || responseData
    }
  }

  async verify(documentType, data) {
    this.validateDocumentType(documentType)

    try {
      const { url, method, requestData, headers } = this.buildRequestConfig(
        documentType,
        data
      )

      console.log(`Making ${method} request to: ${url}`)
      console.log('Request data:', requestData)

      const response = await axios({
        method,
        url,
        data: method === 'POST' ? requestData : undefined,
        headers,
        timeout: this.timeout
      })

      console.log('OnGrid Response:', response.data)

      // Transform OnGrid response to standard format
      return ResponseTransformer.transformResponse(
        response,
        this.providerName,
        data
      )
    } catch (error) {
      return ResponseTransformer.transformError(error, this.providerName)
    }
  }
}

module.exports = OnGridProvider

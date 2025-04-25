const BaseProvider = require('./baseProvider')
const axios = require('axios')
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
      [DOCUMENT_TYPES.CCRV_VERIFY_REQUEST]: '/ccrv-api/rapid/result'
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
        // Default transformation for POST requests
        return {
          // Different APIs might expect different param names, map accordingly
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
          console.log(data.reference_id, 'data.reference_id')
          return {
            'X-Transaction-ID': data.reference_id
          }
        }
      }
      // Add other specific endpoint configurations as needed
    }

    // Return specific config if exists, otherwise default
    return specificConfigs[documentType] || defaultConfig
  }

  // Helper method to map id_number to the correct field based on document type
  mapIdNumberToCorrectField(documentType, idNumber) {
    const fieldMappings = {
      [DOCUMENT_TYPES.EMPLOYMENT_HISTORY_ADVANCE]: { uan: idNumber }
      // Add more mappings for other document types
    }

    return fieldMappings[documentType] || { id_number: idNumber }
  }

  getHeaders() {
    return {
      ...super.getHeaders(),
      'X-API-Key': this.apiKey,
      'X-Auth-Type': 'API-Key',
      Accept: 'application/json'
    }
  }

  // Build request URL and parameters based on document type
  buildRequestConfig(documentType, data, baseUrl, endpoint) {
    const config = this.getEndpointConfig(documentType)
    let url = `${baseUrl}${endpoint}`
    let method = config.method

    // For GET requests with URL parameters
    if (method === 'GET' && config.paramBuilder) {
      url = `${url}${config.paramBuilder(data)}`
      return { url, method, requestData: null }
    }

    // For POST requests, transform the data according to the endpoint's requirements
    if (method === 'POST' && config.transformRequest) {
      const requestData = config.transformRequest(data)
      return { url, method, requestData }
    }

    // Default case
    return {
      url,
      method,
      requestData: data
    }
  }

  // Extract the relevant data based on document type
  extractResponseData(documentType, responseData) {
    console.log('Extracting data for document type:', documentType)
    console.log('Extracting data RESPONSE:', responseData)

    switch (documentType) {
      case DOCUMENT_TYPES.EMPLOYMENT_HISTORY_ADVANCE:
        if (responseData.data && responseData.data.employment_data) {
          return { employment_history: responseData.data.employment_data }
        }
        break
      case DOCUMENT_TYPES.CCRV_GENERATE_REQUEST:
        if (responseData.data && responseData.data.result) {
          return { verification_result: responseData.data.result }
        }
      case DOCUMENT_TYPES.CCRV_VERIFY_REQUEST:
        if (responseData.data && responseData.data.result) {
          return { verification_result: responseData.data.result }
        }
        break
      // Add cases for other document types here

      default:
        // Default extraction logic
        break
    }

    // If no specific extraction logic matched or data wasn't found,
    // return the most relevant data available
    return responseData.data || responseData
  }

  // Override the verify method for OnGrid's specific handling
  async verify(documentType, data) {
    this.validateDocumentType(documentType)
    console.log('OnGrid data:', data)
    try {
      const baseUrl = this.baseUrl
      const endpoint = this.endpoints[documentType]
      const config = this.getEndpointConfig(documentType)

      // Build request configuration based on document type
      const { url, method, requestData } = this.buildRequestConfig(
        documentType,
        data,
        baseUrl,
        endpoint
      )

      console.log(`Making ${method} request to: ${url}`)
      console.log('With data:', requestData)

      // Get standard headers
      const headers = this.getHeaders()

      // Add any custom headers defined for this document type
      if (config.customHeaders) {
        Object.assign(headers, config.customHeaders(data))
      }

      const response = await axios({
        method: method,
        url: url,
        data: method === 'POST' ? requestData : undefined,
        headers: headers,
        timeout: this.timeout
      })

      console.log('OnGrid Response:', response.data)

      // Transform OnGrid response to match standard format, using document type
      return this.transformResponse(response, documentType)
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Transform OnGrid response to standard format with document type-based handling
  transformResponse(response, documentType) {
    console.log('OnGrid response:', response.data)

    // Extract the relevant data based on document type
    const extractedData = this.extractResponseData(documentType, response.data)

    // Get status code
    const statusCode = response.data.status

    // Get message
    const message = response.data.data?.message

    // Get remark
    const remark =
      response.data.data?.remarks ||
      response.data.remarks ||
      response.data.data?.message ||
      message

    // Determine success status
    const success =
      response.data.success !== undefined
        ? response.data.success
        : statusCode === 200 || statusCode === 201

    return {
      success: success,
      data: extractedData,
      status: statusCode,
      message: message,
      remark: remark
    }
  }

  // Handle errors in standardized way
  handleError(error) {
    console.log('OnGrid provider error:', error.response)
    console.log('OnGrid provider error status:', error.response?.status)

    return {
      success: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status || error.status || 500,
      remark: error.response?.data?.remarks || error.response?.data?.message
    }
  }
}

module.exports = OnGridProvider

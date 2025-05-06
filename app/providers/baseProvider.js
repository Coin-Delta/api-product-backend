// providers/baseProvider.js
const axios = require('axios')
const ResponseTransformer = require('../utils/error/responseTransformer')

class BaseProvider {
  constructor(config) {
    if (!config.baseUrl) {
      throw new Error('Invalid provider configuration: baseUrl is required')
    }
    this.baseUrl = config.baseUrl
    this.token = config.token // for Surepass
    this.apiKey = config.apiKey // for Signzy, OnGrid
    this.apiSecret = config.apiSecret // for Signzy
    this.timeout = config.timeout || 30000
    this.endpoints = this.getEndpoints()
    // Get provider name from constructor name (SurepassProvider -> surepass)
    this.providerName = this.constructor.name
      .replace('Provider', '')
      .toLowerCase()
    console.log(
      'Provider initialized:',
      this.providerName,
      'with endpoints:',
      this.endpoints
    )
  }

  getEndpoints() {
    throw new Error('getEndpoints must be implemented by child class')
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json'
    }
  }

  async verify(documentType, data) {
    this.validateDocumentType(documentType)

    const baseUrl = this.baseUrl
    const endpoint = this.endpoints[documentType]
    console.log(
      'Verifying document type:',
      documentType,
      'with endpoint:',
      endpoint
    )

    try {
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}${endpoint}`,
        data: {
          ...data
        },
        headers: this.getHeaders(),
        timeout: this.timeout
      })

      // Transform response to standardized format
      return ResponseTransformer.transformResponse(
        response,
        this.providerName,
        data
      )
    } catch (error) {
      console.log('Provider error for', this.providerName, ':', error.message)
      console.log('Error status:', error.response?.status || error.status)
      console.log('Error :', error.response)

      // Transform error to standardized format
      return ResponseTransformer.transformError(error, this.providerName)
    }
  }

  validateDocumentType(documentType) {
    if (!this.endpoints[documentType]) {
      throw new Error(`Unsupported document type: ${documentType}`)
    }
  }
}

module.exports = BaseProvider

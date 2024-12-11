const axios = require('axios')

class BaseProvider {
  constructor(config) {
    if (!config.baseUrl) {
      throw new Error('Invalid provider configuration: baseUrl is required')
    }
    console.log('{{base}}', config.baseUrl)
    this.baseUrl = config.baseUrl
    this.token = config.token // for Surepass
    this.apiKey = config.apiKey // for Signzy
    this.apiSecret = config.apiSecret // for Signzy
    this.timeout = config.timeout || 30000
    this.endpoints = this.getEndpoints()
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
    console.log(baseUrl, endpoint, '{{+++++++}}')
    console.log(data, '{DATA}')
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
      console.log(response)
      return {
        success: true,
        data: response.data,
        status: response.status
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status || 500
      }
    }
  }

  validateDocumentType(documentType) {
    if (!this.endpoints[documentType]) {
      throw new Error(`Unsupported document type: ${documentType}`)
    }
  }
}

module.exports = BaseProvider

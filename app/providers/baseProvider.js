const axios = require('axios')

class BaseProvider {
  constructor(config) {
    if (!config.baseUrl) {
      throw new Error('Invalid provider configuration: baseUrl is required')
    }
    this.baseUrl = config.baseUrl
    this.token = config.token // for Surepass
    this.apiKey = config.apiKey // for Signzy
    this.apiSecret = config.apiSecret // for Signzy
    this.timeout = config.timeout || 30000
    this.endpoints = this.getEndpoints()
    console.log('endpoints:', this.endpoints)
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
    console.log('current endpoint:', endpoint)
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
      console.log('success++:', response.data.success)
      console.log('data++:', response.data)
      console.log('status++', response.data.status_code)

      return {
        success: response.data.success,
        data: response.data,
        status: response.data.status
      }
    } catch (error) {
      console.log('base provider err:', error?.response?.data)
      console.log('error.status:', error.response?.status)
      console.log('val status:', error.response?.status || error.status)

      // NOTE: need to handle error diff based on provider error format in future may be
      // below is according to surepass
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        remark: error?.response?.data?.data?.remarks,
        status: error.response?.status || error.status || 500
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

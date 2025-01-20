const axios = require('axios')
const NEW_MOCK_RESPONSES = require('../utils/newMockData.js')

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
      return {
        success: response.data.success,
        data: response.data.data,
        status: response.data.status_code,
        message: response.data.message,
        messageCode: response.data.message_code
      }
    } catch (error) {
      const errorlogs = error.response.data
      console.log('success :', errorlogs.success)
      console.log('error :', errorlogs.data.remarks)
      console.log('status :', errorlogs.status_code)
      console.log('data :', errorlogs.data)
      // NOTE: need to handle error diff based on provider error format in future may be
      // below is according to surepass
      return {
        success: errorlogs.success || false,
        error: errorlogs.data.remarks || errorlogs.message,
        status: errorlogs.status_code,
        data: errorlogs.data
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

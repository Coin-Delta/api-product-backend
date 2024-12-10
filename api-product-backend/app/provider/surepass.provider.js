const BaseProvider = require('./base.provider')

class SurepassProvider extends BaseProvider {
  async verify(documentType, data) {
    const endpoints = {
      aadhaar: '/aadhaar/verify',
      pan: '/pan/verify'
      // Add more document type endpoints
    }

    const endpoint = endpoints[documentType]
    if (!endpoint) {
      throw new Error(`Unsupported document type: ${documentType}`)
    }

    return this._makeRequest(endpoint, 'POST', data)
  }
}

module.exports = SurepassProvider

const { DOCUMENT_TYPES } = require('../constants/documentTypes.js')
const BaseProvider = require('./baseProvider')

// providers/signzy.provider.js

// providers/signzy.provider.js
class SignzyProvider extends BaseProvider {
  getEndpoints() {
    return {
      [DOCUMENT_TYPES.AADHAAR]: '/v2/patrons/aadhaar',
      [DOCUMENT_TYPES.PAN]: '/v2/patrons/pan',
      [DOCUMENT_TYPES.VOTER]: '/v2/patrons/voter',
      [DOCUMENT_TYPES.DRIVING_LICENSE]: '/v2/patrons/dl'
    }
  }

  getHeaders() {
    return {
      ...super.getHeaders(),
      'x-api-key': this.apiKey,
      'x-api-secret': this.apiSecret
    }
  }
}

module.exports = SignzyProvider

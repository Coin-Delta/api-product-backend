const BaseProvider = require('./baseProvider')
const { DOCUMENT_TYPES } = require('../constants/documentTypes.js')

// providers/signzy.provider.js

// providers/signzy.provider.js
class SignzyProvider extends BaseProvider {
  getEndpoints() {
    return {
      // aadhaar: '/v2/patrons/aadhaar',
      // pan: '/v2/patrons/pan',
      // voter: '/v2/patrons/voter',
      // driving_license: '/v2/patrons/dl'
      [DOCUMENT_TYPES.AADHAAR]: '/v2/patrons/aadhaar',
      [DOCUMENT_TYPES.PAN]: '/v2/patrons/pan',
      [DOCUMENT_TYPES.VOTER_ID]: '/v2/patrons/voter',
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

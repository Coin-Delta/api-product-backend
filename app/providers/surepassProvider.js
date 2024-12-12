const { DOCUMENT_TYPES } = require('../constants/documentTypes.js')
const BaseProvider = require('../providers/baseProvider')

class SurepassProvider extends BaseProvider {
  getEndpoints() {
    return {
      // [DOCUMENT_TYPES.AADHAAR]: '/aadhaar-validation/aadhaar-validation',
      // pan: '/pan/verify',
      // voter: '/voter/verify',
      // driving_license: '/dl/verify'
      [DOCUMENT_TYPES.AADHAAR]: '/aadhaar-validation/aadhaar-validation',
      [DOCUMENT_TYPES.PAN]: '/pan/verify',
      [DOCUMENT_TYPES.VOTER]: '/voter/verify',
      [DOCUMENT_TYPES.DRIVING_LICENSE]: '/driving-license/driving-license'
    }
  }

  getHeaders() {
    return {
      ...super.getHeaders(),
      Authorization: `Bearer ${this.token}`
    }
  }
}

module.exports = SurepassProvider

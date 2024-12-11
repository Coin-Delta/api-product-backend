const BaseProvider = require('../providers/baseProvider')

class SurepassProvider extends BaseProvider {
  getEndpoints() {
    return {
      aadhaar: '/aadhaar-validation/aadhaar-validation',
      pan: '/pan/verify',
      voter: '/voter/verify',
      driving_license: '/dl/verify'
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

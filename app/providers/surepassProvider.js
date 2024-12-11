const BaseProvider = require('../providers/baseProvider')

class SurepassProvider extends BaseProvider {
  getEndpoints() {
    return {
      aadhaar: '/aadhaar-validation/aadhaar-validation',
      pan: '/pan/verify',
      voter_id: '/voter-id/voter-id',
      driving_license: '/driving-license/driving-license',
      rc_text: '/rc/rc-full'
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

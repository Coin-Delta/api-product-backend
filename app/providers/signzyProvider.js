const BaseProvider = require('./baseProvider')

// providers/signzy.provider.js

// providers/signzy.provider.js
class SignzyProvider extends BaseProvider {
  getEndpoints() {
    return {
      aadhaar: '/v2/patrons/aadhaar',
      pan: '/v2/patrons/pan',
      voter: '/v2/patrons/voter',
      driving_license: '/v2/patrons/dl'
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

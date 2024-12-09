const BaseService = require('./base.service')

class AadhaarService extends BaseService {
  async verifyAadhaar(documentData) {
    return this.processVerification('aadhaar', documentData)
  }
}

module.exports = AadhaarService

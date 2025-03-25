const ProviderFactory = require('../factory/factoryProvider')

// services/document.service.js
class DocumentService {
  constructor(vendorId) {
    console.log(vendorId, '{{VENDORIS}}')
    this.provider = ProviderFactory.getProvider(vendorId)
  }

  async verifyDocument(documentType, data) {
    try {
      const response = await this.provider.verify(documentType, data)
      console.log(response, 'RES FROM DOCUMENT SERVICE')
      return response
    } catch (error) {
      throw new Error(`Document verification failed: ${error.message}`)
    }
  }
}

module.exports = DocumentService

const ProviderFactory = require('../factory/factoryProvider')

// services/document.service.js
class DocumentService {
  constructor(vendorId) {
    console.log(vendorId, '{{VENDORIS}}')
    this.provider = ProviderFactory.getProvider(vendorId)
  }

  async verifyDocument(documentType, data) {
    console.log('endpoints map:', this.provider.getEndpoints())
    console.log(data, 'doc type', `${documentType}`)
    try {
      return await this.provider.verify(documentType, data)
    } catch (error) {
      throw new Error(`Document verification failed: ${error.message}`)
    }
  }
}

module.exports = DocumentService

const ProviderFactory = require('../factory/factoryProvider')
const ResponseHandler = require('../utils/responseTransformer/responseHandler')

// services/document.service.js
class DocumentService {
  constructor(vendorId) {
    console.log(vendorId, '{{VENDORIS}}')
    this.provider = ProviderFactory.getProvider(vendorId)
    this.vendorId = vendorId
  }

  async verifyDocument(documentType, data) {
    try {
      // return await this.provider.verify(documentType, data)
      const rawResponse = await this.provider.verify(documentType, data)
      console.log('vendor+++', this.vendorId)
      // return ResponseHandler.transformResponse(
      //   this.vendorId,
      //   documentType,
      //   rawResponse
      // )
      return rawResponse
    } catch (error) {
      throw new Error(`Document verification failed: ${error.message}`)
    }
  }
}

module.exports = DocumentService

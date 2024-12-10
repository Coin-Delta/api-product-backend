const ProviderFactory = require('../provider/provider.factory')

class BaseService {
  constructor(vendorId, apiId) {
    this.vendorId = vendorId
    this.apiId = apiId
  }

  async processVerification(documentType, documentData) {
    try {
      // Fetch vendor and API configurations
      const vendorConfig = this._getVendorConfig()
      const provider = ProviderFactory.getProvider(this.vendorId, vendorConfig)

      // Verify document
      const result = await provider.verify(documentType, documentData)

      // Log or perform additional processing
      return result
    } catch (error) {
      // Handle errors
      throw error
    }
  }

  _getVendorConfig() {
    // Implement logic to fetch vendor configuration
    // This could involve database lookup or environment variables
    return {
      baseUrl: process.env[`${this.vendorId.toUpperCase()}_BASE_URL`],
      apiKey: process.env[`${this.vendorId.toUpperCase()}_API_KEY`]
    }
  }
}

module.exports = BaseService

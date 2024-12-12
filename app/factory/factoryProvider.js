const SurepassProvider = require('../providers/surepassProvider')
const SignzyProvider = require('../providers/signzyProvider')

class ProviderFactory {
  static #providers = {
    signzy: SignzyProvider,
    surepass: SurepassProvider
  }

  static #configurations = {
    signzy: {
      baseUrl: process.env.SIGNZY_BASE_URL,
      apiKey: process.env.SIGNZY_API_KEY,
      apiSecret: process.env.SIGNZY_API_SECRET,
      timeout: 20000
    },
    surepass: {
      baseUrl: process.env.APIPRODUCT_BASEURL,
      token: process.env.API_TOKEN,
      timeout: 30000
    }
  }

  static getProvider(vendorId) {
    console.log('Vendor ID received:', vendorId)
    console.log('Available providers:', Object.keys(this.#providers))
    console.log('Available configurations:', Object.keys(this.#configurations))

    // Convert vendorId to lowercase for case-insensitive matching
    const normalizedVendorId = vendorId?.toLowerCase()

    const Provider = this.#providers[normalizedVendorId]
    const config = this.#configurations[normalizedVendorId]
    console.log(config)

    if (!Provider || !config) {
      throw new Error(
        `Unsupported vendor: ${vendorId} (normalized: ${normalizedVendorId})`
      )
    }

    return new Provider(config)
  }

  static registerProvider(vendorId, ProviderClass, config) {
    const normalizedVendorId = vendorId.toLowerCase()
    this.#providers[normalizedVendorId] = ProviderClass
    this.#configurations[normalizedVendorId] = config
  }
}

module.exports = ProviderFactory

const SurepassProvider = require('../providers/surepassProvider')
const DeepVueProvider = require('../providers/DeepVueProvider')
const OnGridProvider = require('../providers/onGridProvider')

class ProviderFactory {
  static #providers = {
    surepass: SurepassProvider,
    deepvuetech: DeepVueProvider,
    ongrid: OnGridProvider
  }

  static #configurations = {
    surepass: {
      baseUrl: process.env.APIPRODUCT_BASEURL,
      token: process.env.API_TOKEN,
      timeout: 30000
    },
    deepvuetech: {
      baseUrl: process.env.DEEPVUE_BASE_URL_V1,
      clientId: process.env.DEEPVUE_CLIENT_ID,
      clientSecret: process.env.DEEPVUE_CLIENT_SECRET,
      timeout: 30000
    },
    ongrid: {
      baseUrl: process.env.ONGRID_BASE_URL,
      apiKey: process.env.ONGRID_API_KEY,
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

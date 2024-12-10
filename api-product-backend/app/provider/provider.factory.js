const SignzyProvider = require('./signzy.provider')
const SurepassProvider = require('./surepass.provider')

class ProviderFactory {
  static getProvider(vendorId, config) {
    const providers = {
      signzy: SignzyProvider,
      surepass: SurepassProvider
    }

    const ProviderClass = providers[vendorId]
    if (!ProviderClass) {
      throw new Error(`Unsupported vendor: ${vendorId}`)
    }

    return new ProviderClass(config)
  }
}

module.exports = ProviderFactory

// services/responseHandler.js
const { STATUS_CODES } = require('../../constants/statusCodes.js')
const SurepassTransformer = require('./surepassResponseTransformer')
// const SignzyTransformer = require('../transformers/signzyTransformer')

class ResponseHandler {
  static #transformers = {
    surepass: SurepassTransformer
    // signzy: SignzyTransformer
  }

  static #defaultTransform(documentType, providerResponse) {
    // Handle error case
    if (!providerResponse.success) {
      return {
        success: false,
        data: null,
        status: providerResponse.status || STATUS_CODES.BAD_REQUEST,
        error: providerResponse.error || `${documentType} verification failed`
      }
    }

    // Handle success case
    return {
      success: true,
      data: providerResponse.data || {},
      status: providerResponse.status || STATUS_CODES.SUCCESS
    }
  }

  static transformResponse(provider, documentType, providerResponse) {
    try {
      // If provider is not provided or null/undefined, use default transformer
      // consoe.log('provider :', provider)
      // consoe.log('documentType :', documentType)
      // consoe.log('providerResponse :', providerResponse)
      if (!provider) {
        console.warn(
          'No provider specified, using default transformer',
          provider
        )
        return this.#defaultTransform(documentType, providerResponse)
      }

      const Transformer = this.#transformers[provider.toLowerCase()]

      // If no specific transformer found for provider, use default transformer
      if (!Transformer) {
        console.warn(
          `No transformer found for provider: ${provider}, using default transformer`
        )
        return this.#defaultTransform(documentType, providerResponse)
      }

      return Transformer.transform(documentType, providerResponse)
    } catch (error) {
      // If any error occurs during transformation, return formatted error response
      console.error('Error during response transformation:', error)
      return {
        success: false,
        data: null,
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: 'Error processing document verification response'
      }
    }
  }

  static registerTransformer(providerName, TransformerClass) {
    if (!providerName || !TransformerClass) {
      throw new Error('Provider name and transformer class are required')
    }

    const normalizedProviderName = providerName.toLowerCase()
    this.#transformers[normalizedProviderName] = TransformerClass
  }

  // Method to check if a transformer exists for a provider
  static hasTransformer(providerName) {
    if (!providerName) return false
    return !!this.#transformers[providerName.toLowerCase()]
  }
}

module.exports = ResponseHandler

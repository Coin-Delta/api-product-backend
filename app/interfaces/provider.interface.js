class ProviderInterface {
  constructor(config) {
    if (new.target === ProviderInterface) {
      throw new TypeError(
        'Cannot construct ProviderInterface instances directly'
      )
    }
    this.config = config
  }

  async verify(apiDetails, requestData) {
    throw new Error('Method "verify" must be implemented')
  }

  // Common method to validate successful response
  _isSuccessfulResponse(response) {
    return response.status === 200 || response.status === 204
  }
}

module.exports = ProviderInterface

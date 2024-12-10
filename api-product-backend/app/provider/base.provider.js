const axios = require('axios')
const ProviderInterface = require('../interfaces/provider.interface')

class BaseProvider extends ProviderInterface {
  constructor(config) {
    super(config)
    this.baseUrl = config.baseUrl
    this.apiKey = config.apiKey
    this.timeout = config.timeout || 10000 // 10 seconds default
  }

  async _makeRequest(endpoint, method, data) {
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        data,
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json'
        },
        timeout: this.timeout
      })

      return {
        success: this._validateResponse(response),
        data: response.data,
        status: response.status
      }
    } catch (error) {
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
        status: error.response ? error.response.status : 500
      }
    }
  }
}

module.exports = BaseProvider

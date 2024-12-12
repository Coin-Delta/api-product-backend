const BaseError = require('./baseError.js')

// src/utils/errors/WalletError.js
class APIError extends BaseError {
  constructor(statusCode, message) {
    super(statusCode, message)
    this.name = 'APIError'
  }
}

module.exports = APIError

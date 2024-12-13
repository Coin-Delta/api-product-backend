const BaseError = require('./baseError.js')

// src/utils/errors/WalletError.js
class WalletError extends BaseError {
  constructor(statusCode, message) {
    super(statusCode, message)
    this.name = 'WalletError'
  }
}

module.exports = WalletError

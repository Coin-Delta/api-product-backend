// src/utils/errors/WalletError.js
class WalletError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = 'WalletError'
  }
}

module.exports = WalletError

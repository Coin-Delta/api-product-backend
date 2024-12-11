// src/utils/errors/WalletError.js
class APIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = 'APIError'
  }
}

module.exports = APIError

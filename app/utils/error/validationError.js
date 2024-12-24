const BaseError = require('./baseError.js')

class ValidationError extends BaseError {
  constructor(statusCode, message) {
    super(statusCode, message)
    this.name = 'ValidationError'
  }
}

module.exports = ValidationError

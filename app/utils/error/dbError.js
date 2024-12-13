const BaseError = require('./baseError.js')

class DBError extends BaseError {
  constructor(statusCode, message) {
    super(statusCode, message)
    this.name = 'DBError'
  }
}

module.exports = DBError

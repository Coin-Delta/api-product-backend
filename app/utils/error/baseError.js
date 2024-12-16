class BaseError extends Error {
  constructor(statusCode, message) {
    super(message) // Call the parent constructor with the message
    this.statusCode = statusCode
    // this.name = name
    this.message = message

    // Capture the stack trace (useful for debugging)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

module.exports = BaseError

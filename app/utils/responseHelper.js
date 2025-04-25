// utils/ResponseHelper.js

class ResponseHelper {
  static success(
    res,
    data = null,
    message = 'Success',
    statusCode = 200,
    remark = null,
    referenceId = null
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      remark,
      referenceId,
      timestamp: new Date().toISOString()
    })
  }

  static error(
    res,
    message = 'Error occurred',
    statusCode = 400,
    errors = null,
    remark = null,
    referenceId = null
  ) {
    console.log('error--:', message, statusCode, errors)
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      errMsg: errors.message,
      remark,
      referenceId,
      timestamp: new Date().toISOString()
    })
  }

  // For validation errors
  static validationError(res, errors) {
    return this.error(res, 'Validation failed', 422, errors)
  }

  // For unauthorized access
  static unauthorized(res, message = 'Unauthorized access') {
    return this.error(res, message, 401)
  }

  // For not found
  static notFound(res, message = 'Resource not found') {
    return this.error(res, message, 404)
  }

  // For server errors
  static serverError(res, error) {
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message

    return this.error(
      res,
      message,
      500,
      process.env.NODE_ENV === 'development' ? error.stack : undefined
    )
  }

  // For custom status codes
  static custom(
    res,
    {
      success = true,
      message = '',
      data = null,
      statusCode = 200,
      errors = null
    }
  ) {
    return res.status(statusCode).json({
      success,
      message,
      data,
      errors,
      timestamp: new Date().toISOString()
    })
  }
}

module.exports = ResponseHelper

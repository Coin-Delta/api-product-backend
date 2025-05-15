// utils/ResponseHelper.js

class ResponseHelper {
  static success(
    res,
    data = null,
    message = 'Success',
    statusCode = 200,
    remark = null,
    referenceId = null,
    messageCode
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      remark,
      referenceId,
      message,
      messageCode,
      timestamp: new Date().toISOString()
    })
  }
  static employmentCompositeAPIsuccess(
    res,
    data = null,
    message = 'Success',
    statusCode = 200,
    remark = null,
    referenceId = null,
    messageCode,
    apiId
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      remark,
      referenceId,
      message,
      messageCode,
      apiId,
      timestamp: new Date().toISOString()
    })
  }
  static customSuccess(
    res,
    data = null,
    message = 'Success',
    statusCode = 200,
    apiId = null
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      apiId,
      timestamp: new Date().toISOString()
    })
  }

  static error(
    res,
    message = 'Error occurred',
    statusCode = 400,
    errorDetails = null,
    remark = null,
    referenceId = null,
    messageCode = null
  ) {
    console.log('API Error:', { message, statusCode, errorDetails })

    // Handle case where errorDetails is an object with additional info
    const errors = errorDetails?.error || errorDetails
    const errMsg = errorDetails?.error || message
    const finalMessageCode = errorDetails?.messageCode || messageCode
    const finalRemark = errorDetails?.remark || remark

    return res.status(statusCode).json({
      success: false,
      message: errMsg,
      error: errors,
      messageCode: finalMessageCode,
      remark: finalRemark,
      referenceId,
      timestamp: new Date().toISOString()
    })
  }
  static employmentCompositeAPIError(
    res,
    message = 'Error occurred',
    statusCode = 400,
    errorDetails = null,
    remark = null,
    referenceId = null,
    messageCode = null,
    apiId
  ) {
    console.log('API Error:', { message, statusCode, errorDetails })

    // Handle case where errorDetails is an object with additional info
    const errors = errorDetails?.error || errorDetails
    const errMsg = errorDetails?.error || message
    const finalMessageCode = errorDetails?.messageCode || messageCode
    const finalRemark = errorDetails?.remark || remark

    return res.status(statusCode).json({
      success: false,
      message: errMsg,
      error: errors,
      messageCode: finalMessageCode,
      remark: finalRemark,
      referenceId,
      apiId,
      timestamp: new Date().toISOString()
    })
  }

  static customError(
    res,
    message = 'Error occurred',
    statusCode = 400,
    errorDetails = null,
    apiId = null
  ) {
    console.log('API Error:', { message, statusCode, errorDetails })

    // Handle case where errorDetails is an object with additional info
    const errors = errorDetails?.error || errorDetails
    const errMsg = errorDetails?.error || message
    const finalMessageCode = errorDetails?.messageCode || messageCode

    return res.status(statusCode).json({
      success: false,
      message: errMsg,
      error: errors,
      messageCode: finalMessageCode,
      apiId,
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
  static serverError(
    res,
    message = 'Error occurred',
    statusCode = 400,
    errorDetails = null,
    remark = null,
    referenceId = null,
    messageCode = null
  ) {
    console.log('API Error:', { message, statusCode, errorDetails })

    // Handle case where errorDetails is an object with additional info
    const errors = errorDetails?.error || errorDetails
    const errMsg = errorDetails?.error || message
    const finalMessageCode = errorDetails?.messageCode || messageCode
    const finalRemark = errorDetails?.remark || remark

    return res.status(statusCode).json({
      success: false,
      message: errMsg,
      error: errors,
      messageCode: finalMessageCode,
      remark: finalRemark,
      referenceId,
      timestamp: new Date().toISOString()
    })
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

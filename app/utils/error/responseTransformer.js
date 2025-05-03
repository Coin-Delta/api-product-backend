// utils/responseTransformer.js

/**
 * Class to transform different provider responses into a standardized format
 * This handles the variations between Surepass, DeepVue, OnGrid and other providers
 */
class ResponseTransformer {
  /**
   * Transform provider response to standardized format
   * @param {Object} response - The response from the provider
   * @param {String} providerName - The name of the provider (surepass, deepvue, ongrid)
   * @param {Object} originalData - Original request data (for reference)
   * @returns {Object} - Standardized response object
   */
  static transformResponse(response, providerName, originalData = {}) {
    // Check which transformer to use based on provider name
    switch (providerName.toLowerCase()) {
      case 'surepass':
        return this.transformSurepassResponse(response, originalData)
      case 'deepvue':
      case 'deepvuetech':
        return this.transformDeepVueResponse(response, originalData)
      case 'ongrid':
        return this.transformOnGridResponse(response, originalData)
      default:
        // Generic transform for unknown providers
        return this.transformGenericResponse(response, originalData)
    }
  }

  /**
   * Transform error response to standardized format
   * @param {Error} error - The error object
   * @param {String} providerName - The name of the provider
   * @returns {Object} - Standardized error response
   */
  static transformError(error, providerName) {
    // Check which error transformer to use based on provider name
    switch (providerName.toLowerCase()) {
      case 'surepass':
        return this.transformSurepassError(error)
      case 'deepvue':
      case 'deepvuetech':
        return this.transformDeepVueError(error)
      case 'ongrid':
        return this.transformOnGridError(error)
      default:
        // Generic transform for unknown providers
        return this.transformGenericError(error)
    }
  }

  // --- Provider-specific response transformers ---

  /**
   * Transform Surepass response
   * @param {Object} response - Surepass response object
   * @param {Object} originalData - Original request data (for reference)
   * @returns {Object} - Standardized response
   */
  static transformSurepassResponse(response, originalData) {
    console.log('SUREPASS RESPONSE MODIFIER', response)

    const data = response.data

    // Surepass format: { data: {...}, status_code: 200, success: true, message: null, message_code: "success" }
    return {
      success: data.success,
      data: data.data,
      status: data.status_code,
      message: data.message || 'Success',
      messageCode: data.message_code,
      remark: data.message,
      referenceId: data.data?.client_id || null
    }
  }

  /**
   * Transform DeepVue response
   * @param {Object} response - DeepVue response object
   * @param {Object} originalData - Original request data (for reference)
   * @returns {Object} - Standardized response
   */
  static transformDeepVueResponse(response, originalData) {
    console.log('Deepvue RESPONSE MODIFIER', response)

    const data = response.data

    // Check if this is an OTP generation or reference_id response
    if (data.reference_id) {
      return {
        success: data.code === 200,
        data: {
          referenceId: data.reference_id,
          transactionId: data.transaction_id
        },
        status: data.code,
        message: data.message,
        messageCode: data.sub_code,
        remark: data.message,
        referenceId: data.reference_id
      }
    }

    // Normal data response
    return {
      success: data.code === 200,
      data: data.data || data,
      status: data.code,
      message: data.message,
      messageCode: data.sub_code,
      remark: data.message,
      referenceId: data.transaction_id
    }
  }

  /**
   * Transform OnGrid response
   * @param {Object} response - OnGrid response object
   * @param {Object} originalData - Original request data (for reference)
   * @returns {Object} - Standardized response
   */
  static transformOnGridResponse(response, originalData) {
    console.log('ONGRID RESPONSE MODIFIER', response)

    const data = response.data

    // OnGrid format: { request_id: "xxx", status: 200, data: { code: "xxx", message: "xxx", ... } }
    return {
      success: data.status === 200 && data.data?.code !== '1011', // Special handling for OnGrid error codes
      data: data.data,
      status: data.status,
      message: data.data?.message || 'Success',
      messageCode: data.data?.code,
      remark: data.data?.remarks || data.data?.message,
      referenceId: data.request_id
    }
  }

  /**
   * Generic response transformer for unknown providers
   * @param {Object} response - Response object
   * @param {Object} originalData - Original request data (for reference)
   * @returns {Object} - Standardized response
   */
  static transformGenericResponse(response, originalData) {
    console.log('GENERIC RESPONSE MODIFIER', response)
    const data = response.data || response

    return {
      success:
        data.success !== false &&
        (data.status === 200 ||
          data.statusCode === 200 ||
          data.status_code === 200),
      data: data.data || data,
      status: data.status || data.statusCode || data.status_code || 200,
      message: data.message || 'Success',
      messageCode: data.code || data.messageCode || 'success',
      remark: data.message || data.remark,
      referenceId: data.referenceId || data.reference_id || data.id || null
    }
  }

  // --- Provider-specific error transformers ---

  /**
   * Transform Surepass error
   * @param {Error} error - Error object
   * @returns {Object} - Standardized error response
   */
  static transformSurepassError(error) {
    // Extract error data if available
    console.log('SUREPASS ERR MODIFIER', error?.data)
    const errorData = error.response?.data

    return {
      success: false,
      error: errorData?.message || error.message,
      status: errorData?.status_code || error.response?.status || 500,
      message: errorData?.message || 'Verification failed',
      messageCode: errorData?.message_code || 'error',
      remark: errorData?.message || error.message
    }
  }

  /**
   * Transform DeepVue error
   * @param {Error} error - Error object
   * @returns {Object} - Standardized error response
   */
  static transformDeepVueError(error) {
    console.log('DEEPVUE ERR MODIFIER', error)

    // Extract error data if available
    const errorData = error.response?.data

    return {
      success: false,
      error: errorData?.detail || errorData?.message || error.message,
      status: errorData?.code || error.response?.status || 500,
      message: errorData?.message || errorData?.detail || 'Verification failed',
      messageCode: errorData?.sub_code || 'error',
      remark: errorData?.message || error.message
    }
  }

  /**
   * Transform OnGrid error
   * @param {Error} error - Error object
   * @returns {Object} - Standardized error response
   */
  static transformOnGridError(error) {
    // Extract error data if available
    console.log('ONGRID ERR MODIFIER', error)

    const errorData = error.response?.data

    return {
      success: false,
      error: errorData?.data?.message || errorData?.message || error.message,
      status: errorData?.status || error.response?.status || 500,
      message:
        errorData?.data?.message || errorData?.message || 'Verification failed',
      messageCode: errorData?.data?.code || 'error',
      remark:
        errorData?.data?.remarks || errorData?.data?.message || error.message
    }
  }

  /**
   * Generic error transformer for unknown providers
   * @param {Error} error - Error object
   * @returns {Object} - Standardized error response
   */
  static transformGenericError(error) {
    // Extract error data if available
    console.log('GENERIC ERR MODIFIER', error)

    const errorData = error.response?.data

    return {
      success: false,
      error: errorData?.message || error.message,
      status: error.response?.status || error.status || 500,
      message: errorData?.message || error.message || 'Verification failed',
      messageCode: errorData?.code || 'error',
      remark: errorData?.message || error.message
    }
  }
}

module.exports = ResponseTransformer

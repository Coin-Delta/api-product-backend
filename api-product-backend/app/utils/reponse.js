// utils/response.util.js
class ResponseUtil {
  /**
   * Standardized API response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {Object} content - Response content (data, message, or error)
   */
  static send(res, statusCode, content) {
    const response = {
      success: statusCode >= 200 && statusCode < 300,
      timestamp: new Date().toISOString(),
      ...content
    }

    // If there's an error message, add it to errors array
    if (content.message && !response.success) {
      response.errors = [
        {
          message: content.message
        }
      ]
      delete response.message
    }

    return res.status(statusCode).json(response)
  }
}

module.exports = ResponseUtil

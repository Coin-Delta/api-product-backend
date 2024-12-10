/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res = {}, err = {}) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(err)
  }
  // Sends error to user
  try {
    res.status(err?.code || 500).json({
      errors: {
        msg: err?.message || 'An unhandled error occurred.'
      }
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      errors: {
        msg: err?.message || 'An unhandled error occurred.'
      }
    })
  }
}

module.exports = { handleError }

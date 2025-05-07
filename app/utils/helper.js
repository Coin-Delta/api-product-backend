// middleware/controllerSelector.js

/**
 * A middleware factory that selects between real and mock controller methods
 * based on environment and user properties
 *
 * @param {Object} controllers - Object containing controller methods
 * @param {Function} controllers.real - The real controller method to use in production
 * @param {Function} controllers.mock - The mock controller method to use in development or for special users
 * @returns {Function} Middleware function
 */
const controllerSelector = (controllers) => {
  return (req, res, next) => {
    const { real, mock } = controllers

    // Always use mock in development environment
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock controller (development environment)')
      return mock(req, res, next)
    }

    // We're in production now - check for special user
    if (
      process.env.NODE_ENV === 'production' &&
      req.user &&
      req.user.useMockData
    ) {
      console.log(
        'Using mock controller for special user in production:',
        req.user.bcaId
      )
      return mock(req, res, next)
    }

    // Default case - use real controller
    return real(req, res, next)
  }
}

module.exports = controllerSelector

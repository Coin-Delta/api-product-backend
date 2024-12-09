require('../../../config/apiKeyPassportConfig')
const passport = require('passport')

const customAuthMiddleware = (req, res, next) => {
  passport.authenticate('apiKey', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // Add user and token payload to req object
    req.user = user
    req.tokenPayload = info.payload.data

    next()
  })(req, res, next)
}

module.exports = customAuthMiddleware

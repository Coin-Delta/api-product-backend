const jwt = require('jsonwebtoken')
const { encrypt } = require('../../../middleware/auth')

/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = (user = '') => {
  try {
    // Gets expiration time
    const expiration =
      Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES

    // returns signed and encrypted token
    return {
      token: encrypt(
        jwt.sign(
          {
            data: {
              _id: user
            },
            exp: expiration
          },
          process.env.JWT_SECRET
        )
      ),
      expiry: expiration
    }
  } catch (error) {
    throw error
  }
}
const generateRefreshToken = (user = '') => {
  try {
    // Gets expiration time
    const expiration =
      Math.floor(Date.now() / 1000) +
      60 * process.env.JWT_REFRESH_EXPIRATION_IN_MINUTES

    // returns signed and encrypted token
    return {
      token: encrypt(
        jwt.sign(
          {
            data: {
              _id: user
            },
            exp: expiration
          },
          process.env.JWT_SECRET
        )
      ),
      expiry: expiration
    }
  } catch (error) {
    throw error
  }
}
module.exports = { generateToken, generateRefreshToken }

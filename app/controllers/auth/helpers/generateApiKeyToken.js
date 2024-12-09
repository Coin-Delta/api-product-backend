const jwt = require('jsonwebtoken')
const { encryptApiKey } = require('../../../middleware/auth')

/**
 * Generates a token
 * @param {Object} user - user object
 * @param {String} apiKey - API key of the company
 */
const generateApiKeyToken = (user = '', apiKey = '') => {
  console.log(apiKey, 'LOGINGENERATE')
  console.log(user, 'LOGINGENERATE+++')
  try {
    // Gets expiration time
    const expiration =
      Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES
    console.log(apiKey)
    // returns signed and encrypted token
    return {
      token: encryptApiKey(
        jwt.sign(
          {
            data: {
              _id: user?._id,
              apiKey: apiKey,
              BCAId: user?.BCAId
            },
            exp: expiration
          },
          process.env.APIKEY_JWT_SECRET
        )
      ),
      expiry: expiration
    }
  } catch (error) {
    throw error
  }
}

const generateApiKeyRefreshToken = (user = '') => {
  try {
    // Gets expiration time
    const expiration =
      Math.floor(Date.now() / 1000) +
      60 * process.env.JWT_REFRESH_EXPIRATION_IN_MINUTES

    // returns signed and encrypted token
    return {
      token: encryptApiKey(
        jwt.sign(
          {
            data: {
              _id: user
            },
            exp: expiration
          },
          process.env.APIKEY_JWT_SECRET
        )
      ),
      expiry: expiration
    }
  } catch (error) {
    throw error
  }
}

module.exports = { generateApiKeyToken, generateApiKeyRefreshToken }

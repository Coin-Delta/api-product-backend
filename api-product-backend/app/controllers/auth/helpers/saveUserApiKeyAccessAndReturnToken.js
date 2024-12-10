const {
  generateApiKeyToken,
  generateApiKeyRefreshToken
} = require('./generateApiKeyToken')

const saveUserApiKeyAccessAndReturnToken = (user = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Generate the API key token and refresh token with user ID and apiKey
      const { token, expiry } = generateApiKeyToken(
        user,
        user?.apiKeyRequest?.apiKey
      )
      const { token: refreshToken, expiry: refreshExpiry } =
        generateApiKeyRefreshToken(user._id)

      // Return the generated tokens and user information
      resolve({
        token,
        expiry,
        user: user,
        refreshToken,
        refreshExpiry
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { saveUserApiKeyAccessAndReturnToken }

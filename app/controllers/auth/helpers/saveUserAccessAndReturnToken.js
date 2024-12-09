const UserAccess = require('../../../models/userAccess')
const { generateToken, generateRefreshToken } = require('./generateToken')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 */
const saveUserAccessAndReturnToken = (req = {}, user = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userAccess = new UserAccess({
        email: req.email
      })

      await userAccess.save()

      user.email = req.email
      const { token, expiry } = generateToken(user._id)
      const { token: refreshToken, expiry: refreshExpiry } =
        generateRefreshToken(user._id)

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

const refreshUserAccessAndReturnToken = (req = {}, user = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userAccess = new UserAccess({
        userWallet: user.userWallet
      })

      await userAccess.save()

      // const userInfo = await setUserInfo(user);
      const { token, expiry } = generateToken(user._id)

      resolve({
        token,
        expiry,
        user: user // Update this to userInfo if needed
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  saveUserAccessAndReturnToken,
  refreshUserAccessAndReturnToken
}

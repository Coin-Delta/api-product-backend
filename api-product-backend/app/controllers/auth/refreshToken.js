const {
  getUserIdFromToken,
  findUserById,
  getTokenExpiry,
  refreshUserAccessAndReturnToken
} = require('./helpers')
const { isIDGood, handleError } = require('../../middleware/utils')
/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const refreshToken = async (req, res) => {
  try {
    let userId = await getUserIdFromToken(req?.body?.refreshToken)
    userId = await isIDGood(userId)
    const user = await findUserById(userId)
    const token = await refreshUserAccessAndReturnToken(req, user)
    const refreshExpiry = await getTokenExpiry(req?.body?.refreshToken)
    res
      .status(200)
      .json({ ...token, refreshToken: req?.body?.refreshToken, refreshExpiry })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { refreshToken }

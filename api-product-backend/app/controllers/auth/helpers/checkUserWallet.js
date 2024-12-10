const User = require('../../../models/user')
const BCA = require('../../../models/BCA')
const company = require('../../../models/company')
/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const checkUserWallet = (req = {}) => {
  return new Promise(async (resolve, reject) => {
    const userWallet = req.body.userWallet
    try {
      let user = await User.findOne({ userWallet: userWallet })

      if (!user) {
        user = await BCA.findOne({ userWallet: userWallet })
      }

      if (!user) {
        user = await company.findOne({ userWallet: userWallet })
      }
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { checkUserWallet }

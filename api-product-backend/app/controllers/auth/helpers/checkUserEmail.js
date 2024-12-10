const User = require('../../../models/user')
const BCA = require('../../../models/BCA')
const company = require('../../../models/company')
/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const checkUserEmail = (req = {}) => {
  return new Promise(async (resolve, reject) => {
    const userEmail = req.email
    try {
      let user = await User.find({ email: userEmail })

      if (user.length == 0) {
        user = await BCA.find({ email: userEmail })
      }

      if (user.length == 0) {
        user = await company.find({ email: userEmail })
      }
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { checkUserEmail }

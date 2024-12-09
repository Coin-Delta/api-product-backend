const User = require('../../../models/user')
const BCA = require('../../../models/BCA')
const company = require('../../../models/company')
/**
 * Finds user by email
 * @param {string} userName - user´s userName
 */
const checkUsername = (req = {}) => {
  return new Promise(async (resolve, reject) => {
    const providedUsername = req.userName
    try {
      let user = await User.find({ userName: providedUsername })

      if (user.length == 0) {
        user = await BCA.find({ userName: providedUsername })
      }

      if (user.length == 0) {
        user = await company.find({ userName: providedUsername })
      }
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { checkUsername }

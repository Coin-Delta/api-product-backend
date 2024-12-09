/**
 * Checks if userWallet matches
 * @param {string}  userWallet - wallet address
 * @param {Object} user - user object
 * @returns {string}
 */


const checkWalletAddress = (userWallet = '', user = {}) => {
  return new Promise((resolve, reject) => {
    if (user.userWallet === null || user.userWallet === undefined) {
      return reject({ code: 422, message: 'userWallet_NOT_SET' })
    }
    user.compareWalletAddress(userWallet, (err, isMatch) => {
      if (err) {
        return reject({ code: 422, message: err?.message })
      }
      if (!isMatch) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

module.exports = { checkWalletAddress }

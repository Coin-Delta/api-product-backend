const CryptoJS = require('crypto-js')

const encryptFields = (value, secretKey) => {
  return CryptoJS.AES.encrypt(value, secretKey).toString()
}

module.exports = { encryptFields }

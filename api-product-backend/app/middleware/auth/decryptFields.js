const CryptoJS = require('crypto-js')

const decryptFields = (value, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(value, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

module.exports = { decryptFields }

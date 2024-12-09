const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js')

// Middleware function for decrypting passwords
const decryptPassword = async (password, encryptedPassword) => {
  try {
    const secretKey = process.env.SECRET_KEY
    const bytes = CryptoJS.AES.decrypt(password, secretKey)

    const bytes2 = CryptoJS.AES.decrypt(encryptedPassword, secretKey)

    // console.log('BYTES', bytes)
    // console.log('BYTES222', bytes2)

    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)
    // console.log('DECRYPTEDPASS', decryptedPassword)

    const decryptedPassword2 = bytes2.toString(CryptoJS.enc.Utf8)
    // console.log('DECRYPTEDPASS222', decryptedPassword2)

    const passwordMatch = decryptedPassword === decryptedPassword2

    // console.log('PAsswordMatch', passwordMatch)
    return passwordMatch
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { decryptPassword }

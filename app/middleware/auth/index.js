const { checkWalletAdress } = require('./checkWalletAddress')
const { decrypt } = require('./decrypt')
const { encrypt } = require('./encrypt')
const { decryptPassword } = require('./decryptPassword')
const { encryptPassword } = require('./encryptPassword')
const { sendVerificationEmail } = require('./sendEmail')
const { encryptFields } = require('./encryptFields')
const { decryptFields } = require('./decryptFields')
const decryptApiKey = require('./decryptApiKey')
const { encryptApiKey } = require('./encryptApiKey')
// const customAuthMiddleware = require('./customAuthMiddleware')

module.exports = {
  checkWalletAdress,
  sendVerificationEmail,
  decryptPassword,
  encryptPassword,
  decrypt,
  decryptApiKey,
  encrypt,
  encryptApiKey,
  encryptFields,
  decryptFields
  // customAuthMiddleware
}

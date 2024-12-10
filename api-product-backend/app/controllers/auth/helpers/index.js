const { registerUser } = require('./registerUser')
const { findUser } = require('./findUser')
const { saveLoginAttemptsToDB } = require('./saveLoginAttemptsToDB')
const {
  saveUserAccessAndReturnToken
} = require('./saveUserAccessAndReturnToken')
const { generateToken, generateRefreshToken } = require('./generateToken')
const { checkUserWallet } = require('./checkUserWallet')
const { getDataFromDB } = require('./getDataFromDB')
const { updateDataInDBbyId } = require('./updateDataInDBbyId')
const { checkUserEmail } = require('./checkUserEmail')
const { getUserFromDB } = require('./getUserFromDB')
const { checkPermissions } = require('./checkPermissions')
const {
  generateApiKeyToken,
  generateApiKeyRefreshToken
} = require('./generateApiKeyToken')
const {
  saveUserApiKeyAccessAndReturnToken
} = require('./saveUserApiKeyAccessAndReturnToken')
const { checkUsername } = require('./checkUsername')

module.exports = {
  registerUser,
  findUser,
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken,
  generateToken,
  generateApiKeyToken,
  generateRefreshToken,
  checkUserWallet,
  getDataFromDB,
  updateDataInDBbyId,
  checkUserEmail,
  checkUsername,
  getUserFromDB,
  checkPermissions,
  generateApiKeyToken,
  generateApiKeyRefreshToken,
  saveUserApiKeyAccessAndReturnToken
}

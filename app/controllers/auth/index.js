const { login } = require('./login')
const { signUp } = require('./signUp')

const { refreshToken } = require('./refreshToken')
const { getRefreshToken } = require('./getRefreshToken')
const { generateLink } = require('./generateLink')
const { fileUpload, multiUploadFile } = require('./fileUpload')
const { deleteFile } = require('./deleteFile')
const { roleAuthorization } = require('./roleAuthorization')
const {
  sendVerificationEmail,
  sendLoginOTP,
  sendInvite,
  sendSignupOTP,
  sendWebFormEmail,
  sendVerificationLink,
  sendUserLink,
  sendEmailToHr,
  sendEmailForEducation,
  sendInsuffEmailToClient,
  sendEmailToHrForPamac
} = require('./sendEmail')
const { verifyLoginOtp } = require('./verifyLoginOtp')
const { updateBlockEndTime } = require('./updateBlockEndTime')
const { getImage } = require('./getImage')

module.exports = {
  login,
  refreshToken,
  getRefreshToken,
  fileUpload,
  multiUploadFile,
  deleteFile,
  sendVerificationEmail,
  sendLoginOTP,
  verifyLoginOtp,
  sendInvite,
  sendSignupOTP,
  signUp,
  sendWebFormEmail,
  roleAuthorization,
  sendVerificationLink,
  generateLink,
  sendUserLink,
  updateBlockEndTime,
  getImage,
  sendEmailToHr,
  sendEmailForEducation,
  sendInsuffEmailToClient,
  sendEmailToHrForPamac
}

const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  login,
  getRefreshToken,
  refreshToken,
  fileUpload,
  deleteFile,
  verifyLoginOtp,
  sendInvite,
  signUp,
  roleAuthorization,
  generateLink,
  multiUploadFile,
  updateBlockEndTime
} = require('../controllers/auth')

const { getImage } = require('../controllers/auth/getImage')

const {
  validateLogin,
  validateRefreshToken
} = require('../controllers/auth/validators')
const {
  sendLinkToVendor,
  sendInviteToSiriusCandidate,
  sendEmailToHr,
  sendEmailForEducation,
  sendInviteToGVSCandidate,
  sendInsuffEmailToClient,
  sendEmailToHrForVleader,
  sendEmailToHrForPamac
} = require('../controllers/auth/sendEmail')

// router.post('/sendInviteToUser', sendNotificationToUser)

// router.post('/sendInviteToBca', sendNotificationToBca)

router.post(
  '/sendInvite',
  requireAuth,
  // roleAuthorization(['company']),
  sendInvite
)

router.post('/verifyLogin', verifyLoginOtp)
router.post('/blockTime', updateBlockEndTime)
router.post('/sendLinkToVendor', sendLinkToVendor)
router.post('/sendInviteToSiriusCandidate', sendInviteToSiriusCandidate)
router.post('/sendInviteToGVSCandidate', sendInviteToGVSCandidate)
router.post('/sendEmailToHr', sendEmailToHr)
router.post('/sendEmailForEducation', sendEmailForEducation)
router.post('/sendInsuffEmailToClient', sendInsuffEmailToClient)
router.post('/sendEmailToHrForPamac', sendEmailToHrForPamac)
router.post('/generateLink', generateLink)

router.get('/token', requireAuth, trimRequest.all, getRefreshToken)
router.post(
  '/refreshToken',
  trimRequest.all,
  validateRefreshToken,
  refreshToken
)

// Login route/
router.post('/login', trimRequest.all, login)

router.post('/signUp', trimRequest.all, signUp)

// File upload/
router.post('/upload', trimRequest.all, requireAuth, fileUpload)
router.post('/multiUpload', trimRequest.all, requireAuth, multiUploadFile)

// File Delete*/
router.post('/deleteFile', trimRequest.all, deleteFile)
router.get(
  '/download/:fileName',
  trimRequest.all,
  // requireAuth,
  getImage
)

module.exports = router

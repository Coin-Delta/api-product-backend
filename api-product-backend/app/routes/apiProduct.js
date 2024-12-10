const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
// const { roleAuthorization } = require('../controllers/auth/roleAuthorization')

const {
  aadhaarValidation
} = require('../controllers/apiProduct/Aadhar/AadharValidation')
const {
  aadhaarComprehensive,
  verifyAadhaarOTP,
  drivingLicenseValidation,
  rcValidation,
  voterIdValidation
} = require('../controllers/apiProduct')

/*
 * discreteCalls route
 */

module.exports = router

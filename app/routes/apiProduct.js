const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
// const { roleAuthorization } = require('../controllers/auth/roleAuthorization')

const AadhaarController = require('../controllers/apiProduct/aadhaarController')

/*
 * discreteCalls route
 */

router.post(
  '/aadhaar-validation',
  trimRequest.all,
  requireAuth,
  AadhaarController.verifyAadhaar
)

module.exports = router

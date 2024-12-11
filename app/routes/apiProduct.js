const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const AadhaarController = require('../controllers/apiProduct/aadhaarValidationController')
const { verifyJWT } = require('../middleware/auth')

/*
 * discreteCalls route
 */

router.post(
  '/aadhaar-validation',
  trimRequest.all,
  // requireAuth,
  verifyJWT,
  AadhaarController.verifyAadhaar
)

module.exports = router

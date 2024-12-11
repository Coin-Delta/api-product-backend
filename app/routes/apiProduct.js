const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const AadhaarController = require('../controllers/apiProduct/aadhaarValidationController')
const { verifyJWT } = require('../middleware/auth')
const DrivingLicenseController = require('../controllers/apiProduct/drivingLicenseController')
const RCTextController = require('../controllers/apiProduct/rctextController')
const VoteridController = require('../controllers/apiProduct/voterIdController')
const PANLiteController = require('../controllers/apiProduct/panLiteController')
const PANComprehensiveController = require('../controllers/apiProduct/panComprehensiveController')

/*
 * API Product route
 */

router.post(
  '/aadhaar-validation',
  trimRequest.all,
  verifyJWT,
  AadhaarController.verifyAadhaar
)
router.post(
  '/driving-license',
  trimRequest.all,
  verifyJWT,
  DrivingLicenseController.verifyLicense
)
router.post('/verify-rc', trimRequest.all, verifyJWT, RCTextController.verifyRC)

router.post(
  '/verify-voterid',
  trimRequest.all,
  verifyJWT,
  VoteridController.verifyVoterId
)
router.post(
  '/verify-pan-lite',
  trimRequest.all,
  verifyJWT,
  PANLiteController.verifyPANLite
)
router.post(
  '/verify-pan-comprehensive',
  trimRequest.all,
  verifyJWT,
  PANComprehensiveController.verifyPanCard
)

module.exports = router

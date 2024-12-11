const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const AadhaarController = require('../controllers/apiProduct/aadhaarValidationController')
const { verifyJWT } = require('../middleware/auth')
const DrivingLicenseController = require('../controllers/apiProduct/drivingLicenseController')

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

module.exports = router

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
const BankVerificationController = require('../controllers/apiProduct/bankVerificationController')
const BankVerificationPennylessController = require('../controllers/apiProduct/bankVerificationPennylessController')
const CorporateCINController = require('../controllers/apiProduct/corporateCINController')
const CorporateGSTINController = require('../controllers/apiProduct/corporateGSTINController')
const CreditReportController = require('../controllers/apiProduct/creditReportController')
const CreditReportPDFController = require('../controllers/apiProduct/creditReportPdfController')

/*
 * API Product route
 */

router.post(
  '/aadhaar-validation',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? AadhaarController.verifyAadhaarTest
    : AadhaarController.verifyAadhaar
)
router.post(
  '/driving-license',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? DrivingLicenseController.verifyLicenseTest
    : DrivingLicenseController.verifyLicense
)

router.post(
  '/verify-rc',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? RCTextController.verifyRCTest
    : RCTextController.verifyRC
)

router.post(
  '/verify-voterid',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? VoteridController.verifyVoterIdTest
    : VoteridController.verifyVoterId
)

router.post(
  '/verify-pan-lite',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? PANLiteController.verifyPanLiteTest
    : PANLiteController.verifyPANLite
)
router.post(
  '/verify-pan-comprehensive',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? PANComprehensiveController.verifyPanCardTest
    : PANComprehensiveController.verifyPanCard
)
router.post(
  '/bank-verification',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? BankVerificationController.verifyBankDetailsTest
    : BankVerificationController.verifyBankDetails
)

router.post(
  '/bank-verification-pennyless',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? BankVerificationPennylessController.verifyBankDetailsTest
    : BankVerificationPennylessController.verifyBankDetails
)

router.post(
  '/coporate-cin',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? CorporateCINController.verifyCINTest
    : CorporateCINController.verifyCIN
)

router.post(
  '/coporate-gstin',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? CorporateGSTINController.verifyGSTINTest
    : CorporateGSTINController.verifyGSTIN
)
router.post(
  '/credit-report',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? CreditReportController.verifyCreditReportTest
    : CreditReportController.verifyCreditReport
)
router.post(
  '/credit-report-pdf',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? CreditReportPDFController.verifyCreditReportPdfTest
    : CreditReportPDFController.verifyCreditReportPdf
)

module.exports = router

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
const DirectorPhoneNumberController = require('../controllers/apiProduct/directorPhoneController')
const EcourtByCNRController = require('../controllers/apiProduct/ecourtByCNRController')
const ElectricityBillController = require('../controllers/apiProduct/electricityBillController')
const EmploymentHistoryController = require('../controllers/apiProduct/employmentHistroyController')
const FastagRCController = require('../controllers/apiProduct/fastagRCController')
const FastagVerificationController = require('../controllers/apiProduct/fastagVerificationController')
const FetchUPIDetailsController = require('../controllers/apiProduct/fecthUPIDetailsControlller')
const VerifyRCWithMobileController = require('../controllers/apiProduct/mobileNumberToRCController')
const VerifyBankWithMobileController = require('../controllers/apiProduct/mobileToBankDetailsController')
const PANToUANController = require('../controllers/apiProduct/panToUANController')
const verifyPassportController = require('../controllers/apiProduct/passportVerificationController')
const VerifyMobileWithRCController = require('../controllers/apiProduct/rcToMobileVerificationController')
const rationCardVerificationController = require('../controllers/apiProduct/rationCardController')
const TanVerifcationController = require('../controllers/apiProduct/tanVerificationController')
const TanCompanySearchController = require('../controllers/apiProduct/tanCompanySearchController')
const TelecomVerifcationController = require('../controllers/apiProduct/telecomVerificationController')
const TINVerifcationController = require('../controllers/apiProduct/tinVerificationController')
const UdyogAadhaarVerifcationController = require('../controllers/apiProduct/udyogAadhaarController')
const EchallanController = require('../controllers/apiProduct/echallanVerificationController')
const VerifyPanWithAadhaarController = require('../controllers/apiProduct/aadhaarToPanController')
const VerifyUANWithAadhaarController = require('../controllers/apiProduct/aadhaarToUanController')
const DynamicController = require('../controllers/apiProduct/dynamicValidationController.js')
const MobileToUANController = require('../controllers/apiProduct/mobileToUANController.js')

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
  '/test/aadhaar-validation',
  trimRequest.all,
  AadhaarController.verifyAadhaarTest
)

router.post(
  '/driving-license',
  trimRequest.all,
  verifyJWT,
  DrivingLicenseController.verifyLicense
)

router.post(
  '/test/driving-license',
  trimRequest.all,
  DrivingLicenseController.verifyLicenseTest
)

router.post('/verify-rc', trimRequest.all, verifyJWT, RCTextController.verifyRC)

router.post('/test/verify-rc', trimRequest.all, RCTextController.verifyRCTest)

router.post(
  '/verify-voterid',
  trimRequest.all,
  verifyJWT,
  VoteridController.verifyVoterId
)

router.post(
  '/test/verify-voterid',
  trimRequest.all,
  verifyJWT,
  VoteridController.verifyVoterIdTest
)

router.post(
  '/verify-pan-lite',
  trimRequest.all,
  verifyJWT,
  PANLiteController.verifyPANLite
)

router.post(
  '/test/verify-pan-lite',
  trimRequest.all,
  PANLiteController.verifyPanLiteTest
)

router.post(
  '/verify-pan-comprehensive',
  trimRequest.all,
  verifyJWT,
  PANComprehensiveController.verifyPanCard
)

router.post(
  '/test/verify-pan-comprehensive',
  trimRequest.all,
  PANComprehensiveController.verifyPanCardTest
)

router.post(
  '/bank-verification',
  trimRequest.all,
  verifyJWT,
  BankVerificationController.verifyBankDetails
)

router.post(
  '/test/bank-verification',
  trimRequest.all,
  BankVerificationController.verifyBankDetailsTest
)

router.post(
  '/bank-verification-pennyless',
  trimRequest.all,
  verifyJWT,
  BankVerificationPennylessController.verifyBankDetails
)

router.post(
  '/test/bank-verification-pennyless',
  trimRequest.all,
  BankVerificationPennylessController.verifyBankDetailsTest
)

router.post(
  '/coporate-cin',
  trimRequest.all,
  verifyJWT,
  CorporateCINController.verifyCIN
)

router.post(
  '/test/coporate-cin',
  trimRequest.all,
  CorporateCINController.verifyCINTest
)

router.post(
  '/coporate-gstin',
  trimRequest.all,
  verifyJWT,
  CorporateGSTINController.verifyGSTIN
)

router.post(
  '/test/coporate-gstin',
  trimRequest.all,
  CorporateGSTINController.verifyGSTINTest
)

router.post(
  '/credit-report',
  trimRequest.all,
  verifyJWT,
  CreditReportController.verifyCreditReport
)

router.post(
  '/test/credit-report',
  trimRequest.all,
  CreditReportController.verifyCreditReportTest
)

router.post(
  '/credit-report-pdf',
  trimRequest.all,
  verifyJWT,
  CreditReportPDFController.verifyCreditReportPdf
)

router.post(
  '/test/credit-report-pdf',
  trimRequest.all,
  CreditReportPDFController.verifyCreditReportPdfTest
)

router.post(
  '/director-phone',
  trimRequest.all,
  verifyJWT,
  DirectorPhoneNumberController.verifyDirectorPhone
)

router.post(
  '/test/director-phone',
  trimRequest.all,
  DirectorPhoneNumberController.verifyDirectorPhoneTest
)

router.post(
  '/ecourt-cnr',
  trimRequest.all,
  verifyJWT,
  EcourtByCNRController.verifyEcourtCNR
)

router.post(
  '/test/ecourt-cnr',
  trimRequest.all,
  EcourtByCNRController.verifyEcourtCNRTest
)

router.post(
  '/electricity-bill-details',
  trimRequest.all,
  verifyJWT,
  ElectricityBillController.verifyElectricityDetails
)

router.post(
  '/test/electricity-bill-details',
  trimRequest.all,
  ElectricityBillController.verifyElectricityDetailsTest
)

router.post(
  '/employment-history-uan',
  trimRequest.all,
  verifyJWT,
  EmploymentHistoryController.verifyEmploymentHistory
)

router.post(
  '/test/employment-history-uan',
  trimRequest.all,
  EmploymentHistoryController.verifyEmploymentHistoryTest
)

router.post(
  '/fastag-rc',
  trimRequest.all,
  verifyJWT,
  FastagRCController.verifyFastagRCDetails
)

router.post(
  '/test/fastag-rc',
  trimRequest.all,
  FastagRCController.verifyFastagRCDetailsTest
)

router.post(
  '/fastag-details',
  trimRequest.all,
  verifyJWT,
  FastagVerificationController.verifyFastagDetails
)

router.post(
  '/test/fastag-details',
  trimRequest.all,
  FastagVerificationController.verifyFastagDetailsTest
)

router.post(
  '/fetch-upi-details',
  trimRequest.all,
  verifyJWT,
  FetchUPIDetailsController.verifyUPIDetails
)

router.post(
  '/test/fetch-upi-details',
  trimRequest.all,
  FetchUPIDetailsController.verifyUPIDetailsTest
)

router.post(
  '/mobile-to-rc',
  trimRequest.all,
  verifyJWT,
  VerifyRCWithMobileController.verifyRC
)

router.post(
  '/test/mobile-to-rc',
  trimRequest.all,
  VerifyRCWithMobileController.verifyRCTest
)

router.post(
  '/mobile-to-bank',
  verifyJWT,
  trimRequest.all,
  VerifyBankWithMobileController.verifyBankDetails
)

router.post(
  '/test/mobile-to-bank',
  trimRequest.all,
  VerifyBankWithMobileController.verifyBankDetailsTest
)

router.post(
  '/pan-to-uan',
  trimRequest.all,
  verifyJWT,
  PANToUANController.verifyUANWithPAN
)
router.post(
  '/mobile-to-uan',
  trimRequest.all,
  verifyJWT,
  MobileToUANController.verifyUANWithMobile
)

router.post(
  '/test/pan-to-uan',
  trimRequest.all,
  PANToUANController.verifyUANWithPANTest
)

router.post(
  '/passport',
  trimRequest.all,
  verifyJWT,
  verifyPassportController.verifPassport
)

router.post(
  '/test/passport',
  trimRequest.all,
  verifyPassportController.verifyPassportTest
)

router.post(
  '/rc-to-mobile',
  trimRequest.all,
  verifyJWT,
  VerifyMobileWithRCController.verifyMobile
)

router.post(
  '/test/rc-to-mobile',
  trimRequest.all,
  VerifyMobileWithRCController.verifyMobileTest
)

router.post(
  '/ration-card',
  trimRequest.all,
  verifyJWT,
  rationCardVerificationController.verifyRationCard
)

router.post(
  '/test/ration-card',
  trimRequest.all,
  rationCardVerificationController.verifyRationCardTest
)

router.post(
  '/tan',
  trimRequest.all,
  verifyJWT,
  TanVerifcationController.verifyTANDetails
)

router.post(
  '/test/tan',
  trimRequest.all,
  TanVerifcationController.verifyTANDetailsTest
)

router.post(
  '/tan-company-search',
  trimRequest.all,
  verifyJWT,
  TanCompanySearchController.searchCompanyTan
)

router.post(
  '/test/tan-company-search',
  trimRequest.all,
  TanCompanySearchController.searchCompanyTanTest
)

router.post(
  '/telecom-verification',
  trimRequest.all,
  verifyJWT,
  TelecomVerifcationController.verifyTelecomDetails
)

router.post(
  '/test/telecom-verification',
  trimRequest.all,
  TelecomVerifcationController.verifyTelecomDetailsTest
)

router.post(
  '/tin-verification',
  trimRequest.all,
  verifyJWT,
  TINVerifcationController.verifyTINDetails
)

router.post(
  '/test/tin-verification',
  trimRequest.all,
  TINVerifcationController.verifyTINDetailsTest
)

router.post(
  '/udyog-aadhaar',
  trimRequest.all,
  verifyJWT,
  UdyogAadhaarVerifcationController.verifyUdyogAadhaar
)

router.post(
  '/test/udyog-aadhaar',
  trimRequest.all,
  UdyogAadhaarVerifcationController.verifyUdyogAadhaarTest
)

router.post(
  '/echallan',
  trimRequest.all,
  verifyJWT,
  EchallanController.verifyEchallan
)

router.post(
  '/test/echallan',
  trimRequest.all,
  EchallanController.verifyEchallanTest
)

router.post(
  '/aadhaar-pan-link',
  trimRequest.all,
  verifyJWT,
  VerifyPanWithAadhaarController.VerifyPanWithAadhaar
)

router.post(
  '/test/aadhaar-pan-link',
  trimRequest.all,
  VerifyPanWithAadhaarController.VerifyPanWithAadhaarTest
)

router.post(
  '/aadhaar-uan-link',
  trimRequest.all,
  verifyJWT,
  VerifyUANWithAadhaarController.VerifyUANWithAadhaar
)

router.post(
  '/test/aadhaar-uan-link',
  trimRequest.all,
  VerifyUANWithAadhaarController.VerifyUANWithAadhaarTest
)

router.post(
  '/dynamic',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? DynamicController.verifyDocumentTest
    : DynamicController.verifyDocument
)

module.exports = router

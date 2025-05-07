const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

// Import controllers
const AadhaarController = require('../controllers/apiProduct/aadhaarValidationController')
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
const {
  getDashboardAnalytics
} = require('../controllers/dashboardAnalytics/getDashboardAnalytics.js')
const DirectorVerification = require('../controllers/apiProduct/dinVerificationController.js')
const AadhaarDetailsController = require('../controllers/apiProduct/aadhaarDetailsController.js')
const FSSAIVerification = require('../controllers/apiProduct/fssaiVerification.js')
const GSTDetailsAdvanceController = require('../controllers/apiProduct/gstDetailsAdvanceController.js')
const PANAdvanceController = require('../controllers/apiProduct/panAdvanceVerification.js')
const PANUDYAMMSMEController = require('../controllers/apiProduct/panUdyamMsmeStatusController.js')
const EmploymentHistoryAdvanceController = require('../controllers/apiProduct/employmentHistoryAdvance.js')
const CreditReportV2Controller = require('../controllers/apiProduct/creditReportV2Controller.js')
const ccrvController = require('../controllers/apiProduct/ccrvController.js')
const EmploymentCompositeController = require('../controllers/apiProduct/employmentCompositeAPIcontroller.js')
const EmploymentHistoryWithWageMonthController = require('../controllers/apiProduct/employmentHistoryWageMonthController.js')

// Import authentication and controller selector middlewares
const { verifyJWT } = require('../middleware/auth')
const controllerSelector = require('../utils/helper.js')

/*
 * API Product routes
 */

// Aadhaar Validation
router.post(
  '/aadhaar-validation',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: AadhaarController.verifyAadhaar,
    mock: AadhaarController.verifyAadhaarTest
  })
)

// Aadhaar Details - Generate OTP
router.post(
  '/aadhaar-details-generate-otp',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: AadhaarDetailsController.generateOtp,
    mock: AadhaarDetailsController.generateOTPTest
  })
)

// Aadhaar Details - Verify OTP
router.post(
  '/aadhaar-details-verify-otp',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: AadhaarDetailsController.verifyOtp,
    mock: AadhaarDetailsController.verifyAadhaarDetailsTest
  })
)

// FSSAI Verification
router.post(
  '/fssai-verification',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: FSSAIVerification.verifyFSSAI,
    mock: FSSAIVerification.verifyFSSAITest
  })
)

// GST Details Advance
router.post(
  '/gst-details-advance',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: GSTDetailsAdvanceController.verifyGSTAdvance,
    mock: GSTDetailsAdvanceController.verifyGSTAdvanceTest
  })
)

// Driving License
router.post(
  '/driving-license',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: DrivingLicenseController.verifyLicense,
    mock: DrivingLicenseController.verifyLicenseTest
  })
)

// Verify RC
router.post(
  '/verify-rc',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: RCTextController.verifyRC,
    mock: RCTextController.verifyRCTest
  })
)

// Verify Voter ID
router.post(
  '/verify-voterid',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: VoteridController.verifyVoterId,
    mock: VoteridController.verifyVoterIdTest
  })
)

// Employment UAN Verification
router.post(
  '/verify-employment-uan',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: EmploymentCompositeController.verifyEmployment,
    mock: EmploymentCompositeController.verifyEmploymentTest
  })
)

// PAN Lite Verification
router.post(
  '/verify-pan-lite',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: PANLiteController.verifyPANLite,
    mock: PANLiteController.verifyPanLiteTest
  })
)

// PAN Comprehensive Verification
router.post(
  '/verify-pan-comprehensive',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: PANComprehensiveController.verifyPanCard,
    mock: PANComprehensiveController.verifyPanCardTest
  })
)

// Bank Verification
router.post(
  '/bank-verification',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: BankVerificationController.verifyBankDetails,
    mock: BankVerificationController.verifyBankDetailsTest
  })
)

// Bank Verification Pennyless
router.post(
  '/bank-verification-pennyless',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: BankVerificationPennylessController.verifyBankDetails,
    mock: BankVerificationPennylessController.verifyBankDetailsTest
  })
)

// Corporate CIN
router.post(
  '/coporate-cin',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: CorporateCINController.verifyCIN,
    mock: CorporateCINController.verifyCINTest
  })
)

// Corporate GSTIN
router.post(
  '/coporate-gstin',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: CorporateGSTINController.verifyGSTIN,
    mock: CorporateGSTINController.verifyGSTINTest
  })
)

// Credit Report
router.post(
  '/credit-report',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: CreditReportController.verifyCreditReport,
    mock: CreditReportController.verifyCreditReportTest
  })
)

// Credit Report PDF
router.post(
  '/credit-report-pdf',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: CreditReportPDFController.verifyCreditReportPdf,
    mock: CreditReportPDFController.verifyCreditReportPdfTest
  })
)

// Credit Report V2
router.post(
  '/credit-report-v2',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: CreditReportV2Controller.verifyCreditReportPdf,
    mock: CreditReportV2Controller.verifyCreditReportPdfTest
  })
)

// Director Phone
router.post(
  '/director-phone',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: DirectorPhoneNumberController.verifyDirectorPhone,
    mock: DirectorPhoneNumberController.verifyDirectorPhoneTest
  })
)

// Ecourt CNR
router.post(
  '/ecourt-cnr',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: EcourtByCNRController.verifyEcourtCNR,
    mock: EcourtByCNRController.verifyEcourtCNRTest
  })
)

// Electricity Bill Details
router.post(
  '/electricity-bill-details',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: ElectricityBillController.verifyElectricityDetails,
    mock: ElectricityBillController.verifyElectricityDetailsTest
  })
)

// Employment History UAN
router.post(
  '/employment-history-uan',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: EmploymentHistoryController.verifyEmploymentHistory,
    mock: EmploymentHistoryController.verifyEmploymentHistoryTest
  })
)

// Employment History Wage Month
router.post(
  '/employment-history-wage-month',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: EmploymentHistoryWithWageMonthController.verifyEmploymentHistory,
    mock: EmploymentHistoryWithWageMonthController.verifyEmploymentHistoryTest
  })
)

// Employment History Advance
router.post(
  '/employment-history-advance',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: EmploymentHistoryAdvanceController.verifyEmploymentHistory,
    mock: EmploymentHistoryAdvanceController.verifyEmploymentHistoryTest
  })
)

// Employment API
router.post(
  '/employment-api',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: EmploymentHistoryAdvanceController.verifyEmploymentHistory,
    mock: EmploymentHistoryAdvanceController.verifyEmploymentHistoryTest
  })
)

// CCRV Generate Request
router.post(
  '/ccrv-generate-request',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: ccrvController.ccrvUnifiedRequest,
    mock: ccrvController.ccrvUnifiedRequestTest
  })
)

// CCRV Verification Status
router.get(
  '/ccrv/verification/:transactionId',
  verifyJWT,
  trimRequest.all,
  ccrvController.getVerificationStatus
)

// CCRV Get All
router.get('/ccrv', verifyJWT, trimRequest.all, ccrvController.getAllCcrv)

// CCRV Callback
router.get(
  '/ccrv/callback',
  trimRequest.all,
  ccrvController.verificationCallback
)

// CCRV Verify Request
router.post(
  '/ccrv-verify-request',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: ccrvController.ccrvFetchRequest,
    mock: ccrvController.fecthCCRVRequestTest
  })
)

// Fastag RC
router.post(
  '/fastag-rc',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: FastagRCController.verifyFastagRCDetails,
    mock: FastagRCController.verifyFastagRCDetailsTest
  })
)

// Fastag Details
router.post(
  '/fastag-details',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: FastagVerificationController.verifyFastagDetails,
    mock: FastagVerificationController.verifyFastagDetailsTest
  })
)

// Fetch UPI Details
router.post(
  '/fetch-upi-details',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: FetchUPIDetailsController.verifyUPIDetails,
    mock: FetchUPIDetailsController.verifyUPIDetailsTest
  })
)

// Mobile to RC
router.post(
  '/mobile-to-rc',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: VerifyRCWithMobileController.verifyRC,
    mock: VerifyRCWithMobileController.verifyRCTest
  })
)

// Mobile to Bank
router.post(
  '/mobile-to-bank',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: VerifyBankWithMobileController.verifyBankDetails,
    mock: VerifyBankWithMobileController.verifyBankDetailsTest
  })
)

// PAN to UAN
router.post(
  '/pan-to-uan',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: PANToUANController.verifyUANWithPAN,
    mock: PANToUANController.verifyUANWithPANTest
  })
)

// PAN Advance Verification
router.post(
  '/pan-advance-verification',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: PANAdvanceController.verifyPanCard,
    mock: PANAdvanceController.verifyPanCardTest
  })
)

// PAN UDYAM MSME Status
router.post(
  '/pan-udyam-msme-status',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: PANUDYAMMSMEController.verifyPANUDYAMMSMEStatus,
    mock: PANUDYAMMSMEController.verifyPANUDYAMMSMEStatusTest
  })
)

// Mobile to UAN
router.post(
  '/mobile-to-uan',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: MobileToUANController.verifyUANWithMobile,
    mock: MobileToUANController.verifyUANWithMobile // Ensure there's a test version if needed
  })
)

// Passport
router.post(
  '/passport',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: verifyPassportController.verifPassport,
    mock: verifyPassportController.verifyPassportTest
  })
)

// RC to Mobile
router.post(
  '/rc-to-mobile',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: VerifyMobileWithRCController.verifyMobile,
    mock: VerifyMobileWithRCController.verifyMobileTest
  })
)

// Ration Card
router.post(
  '/ration-card',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: rationCardVerificationController.verifyRationCard,
    mock: rationCardVerificationController.verifyRationCardTest
  })
)

// TAN Verification
router.post(
  '/tan',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: TanVerifcationController.verifyTANDetails,
    mock: TanVerifcationController.verifyTANDetailsTest
  })
)

// TAN Company Search
router.post(
  '/tan-company-search',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: TanCompanySearchController.searchCompanyTan,
    mock: TanCompanySearchController.searchCompanyTanTest
  })
)

// Telecom Verification
router.post(
  '/telecom-verification',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: TelecomVerifcationController.verifyTelecomDetails,
    mock: TelecomVerifcationController.verifyTelecomDetailsTest
  })
)

// TIN Verification
router.post(
  '/tin-verification',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: TINVerifcationController.verifyTINDetails,
    mock: TINVerifcationController.verifyTINDetailsTest
  })
)

// Udyog Aadhaar
router.post(
  '/udyog-aadhaar',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: UdyogAadhaarVerifcationController.verifyUdyogAadhaar,
    mock: UdyogAadhaarVerifcationController.verifyUdyogAadhaarTest
  })
)

// Echallan
router.post(
  '/echallan',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: EchallanController.verifyEchallan,
    mock: EchallanController.verifyEchallanTest
  })
)

// Aadhaar PAN Link
router.post(
  '/aadhaar-pan-link',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: VerifyPanWithAadhaarController.VerifyPanWithAadhaar,
    mock: VerifyPanWithAadhaarController.VerifyPanWithAadhaarTest
  })
)

// Aadhaar UAN Link
router.post(
  '/aadhaar-uan-link',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: VerifyUANWithAadhaarController.VerifyUANWithAadhaar,
    mock: VerifyUANWithAadhaarController.VerifyUANWithAadhaarTest
  })
)

// DIN Verification
router.post(
  '/din-verification',
  trimRequest.all,
  verifyJWT,
  controllerSelector({
    real: DirectorVerification.verifyDIN,
    mock: DirectorVerification.verifyDINTest
  })
)

// Dynamic
router.post(
  '/dynamic',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? DynamicController.verifyDocumentTest
    : DynamicController.verifyDocument
)

// Dashboard Analytics
router.post('/dashboard-analytics', trimRequest.all, getDashboardAnalytics)

module.exports = router

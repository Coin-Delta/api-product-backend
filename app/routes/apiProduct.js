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

/*
 * API Product route
 */

// router.post(
//   '/aadhaar-validation',
//   trimRequest.all,
//   verifyJWT,
//   AadhaarController.verifyAadhaar
// )

// router.post(
//   '/test/aadhaar-validation',
//   trimRequest.all,
//   AadhaarController.verifyAadhaarTest
// )

router.post('/aadhaar-validation', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV)
    // Skip JWT verification and go directly to test controller
    return AadhaarController.verifyAadhaarTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      AadhaarController.verifyAadhaar(req, res, next)
    })
  }
})

router.post(
  '/aadhaar-details-generate-otp',
  trimRequest.all,
  (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(process.env.NODE_ENV)
      // Skip JWT verification and go directly to test controller
      return AadhaarDetailsController.generateOTPTest(req, res, next)
    } else {
      // Verify JWT and continue to the real controller
      verifyJWT(req, res, () => {
        AadhaarDetailsController.generateOtp(req, res, next)
      })
    }
  }
)

router.post(
  '/aadhaar-details-verify-otp',
  trimRequest.all,
  (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(process.env.NODE_ENV)
      // Skip JWT verification and go directly to test controller
      return AadhaarDetailsController.verifyAadhaarDetailsTest(req, res, next)
    } else {
      // Verify JWT and continue to the real controller
      verifyJWT(req, res, () => {
        AadhaarDetailsController.verifyOtp(req, res, next)
      })
    }
  }
)

router.post('/fssai-verification', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV)
    // Skip JWT verification and go directly to test controller
    return FSSAIVerification.verifyFSSAITest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      FSSAIVerification.verifyFSSAI(req, res, next)
    })
  }
})

router.post('/gst-details-advance', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV)
    // Skip JWT verification and go directly to test controller
    return GSTDetailsAdvanceController.verifyGSTAdvanceTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      GSTDetailsAdvanceController.verifyGSTAdvance(req, res, next)
    })
  }
})

// router.post(
//   '/driving-license',
//   trimRequest.all,
//   verifyJWT,
//   DrivingLicenseController.verifyLicense
// )

// router.post(
//   '/test/driving-license',
//   trimRequest.all,
//   DrivingLicenseController.verifyLicenseTest
// )
router.post('/driving-license', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return DrivingLicenseController.verifyLicenseTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      DrivingLicenseController.verifyLicense(req, res, next)
    })
  }
})

// router.post('/verify-rc', trimRequest.all, verifyJWT, RCTextController.verifyRC)

// router.post('/test/verify-rc', trimRequest.all, RCTextController.verifyRCTest)
router.post('/verify-rc', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return RCTextController.verifyRCTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      RCTextController.verifyRC(req, res, next)
    })
  }
})
// router.post(
//   '/verify-voterid',
//   trimRequest.all,
//   verifyJWT,
//   VoteridController.verifyVoterId
// )

// router.post(
//   '/test/verify-voterid',
//   trimRequest.all,
//   verifyJWT,
//   VoteridController.verifyVoterIdTest
// )

router.post('/verify-voterid', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return VoteridController.verifyVoterIdTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      VoteridController.verifyVoterId(req, res, next)
    })
  }
})
router.post('/verify-employment-uan', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return EmploymentCompositeController.verifyEmploymentTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      EmploymentCompositeController.verifyEmployment(req, res, next)
    })
  }
})

// router.post(
//   '/verify-pan-lite',
//   trimRequest.all,
//   verifyJWT,
//   PANLiteController.verifyPANLite
// )

// router.post(
//   '/test/verify-pan-lite',
//   trimRequest.all,
//   PANLiteController.verifyPanLiteTest
// )

router.post('/verify-pan-lite', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return PANLiteController.verifyPanLiteTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      PANLiteController.verifyPANLite(req, res, next)
    })
  }
})

// router.post(
//   '/verify-pan-comprehensive',
//   trimRequest.all,
//   verifyJWT,
//   PANComprehensiveController.verifyPanCard
// )

// router.post(
//   '/test/verify-pan-comprehensive',
//   trimRequest.all,
//   PANComprehensiveController.verifyPanCardTest
// )

router.post('/verify-pan-comprehensive', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return PANComprehensiveController.verifyPanCardTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      PANComprehensiveController.verifyPanCard(req, res, next)
    })
  }
})

// router.post(
//   '/bank-verification',
//   trimRequest.all,
//   verifyJWT,
//   BankVerificationController.verifyBankDetails
// )

// router.post(
//   '/test/bank-verification',
//   trimRequest.all,
//   BankVerificationController.verifyBankDetailsTest
// )

router.post('/bank-verification', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return BankVerificationController.verifyBankDetailsTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      BankVerificationController.verifyBankDetails(req, res, next)
    })
  }
})

// router.post(
//   '/bank-verification-pennyless',
//   trimRequest.all,
//   verifyJWT,
//   BankVerificationPennylessController.verifyBankDetails
// )

// router.post(
//   '/test/bank-verification-pennyless',
//   trimRequest.all,
//   BankVerificationPennylessController.verifyBankDetailsTest
// )

router.post(
  '/bank-verification-pennyless',
  trimRequest.all,
  (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      // Skip JWT verification and go directly to test controller
      return BankVerificationPennylessController.verifyBankDetailsTest(
        req,
        res,
        next
      )
    } else {
      // Verify JWT and continue to the real controller
      verifyJWT(req, res, () => {
        BankVerificationPennylessController.verifyBankDetails(req, res, next)
      })
    }
  }
)

// router.post(
//   '/coporate-cin',
//   trimRequest.all,
//   verifyJWT,
//   CorporateCINController.verifyCIN
// )

// router.post(
//   '/test/coporate-cin',
//   trimRequest.all,
//   CorporateCINController.verifyCINTest
// )

router.post('/coporate-cin', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return CorporateCINController.verifyCINTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      CorporateCINController.verifyCIN(req, res, next)
    })
  }
})

// router.post(
//   '/coporate-gstin',
//   trimRequest.all,
//   verifyJWT,
//   CorporateGSTINController.verifyGSTIN
// )

// router.post(
//   '/test/coporate-gstin',
//   trimRequest.all,
//   CorporateGSTINController.verifyGSTINTest
// )

router.post('/coporate-gstin', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return CorporateGSTINController.verifyGSTINTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      CorporateGSTINController.verifyGSTIN(req, res, next)
    })
  }
})

// router.post(
//   '/credit-report',
//   trimRequest.all,
//   verifyJWT,
//   CreditReportController.verifyCreditReport
// )

// router.post(
//   '/test/credit-report',
//   trimRequest.all,
//   CreditReportController.verifyCreditReportTest
// )

router.post('/credit-report', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return CreditReportController.verifyCreditReportTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      CreditReportController.verifyCreditReport(req, res, next)
    })
  }
})

// router.post(
//   '/credit-report-pdf',
//   trimRequest.all,
//   verifyJWT,
//   CreditReportPDFController.verifyCreditReportPdf
// )

// router.post(
//   '/test/credit-report-pdf',
//   trimRequest.all,
//   CreditReportPDFController.verifyCreditReportPdfTest
// )

router.post('/credit-report-pdf', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return CreditReportPDFController.verifyCreditReportPdfTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      CreditReportPDFController.verifyCreditReportPdf(req, res, next)
    })
  }
})
router.post('/credit-report-v2', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return CreditReportV2Controller.verifyCreditReportPdfTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      CreditReportV2Controller.verifyCreditReportPdf(req, res, next)
    })
  }
})

// router.post(
//   '/director-phone',
//   trimRequest.all,
//   verifyJWT,
//   DirectorPhoneNumberController.verifyDirectorPhone
// )

// router.post(
//   '/test/director-phone',
//   trimRequest.all,
//   DirectorPhoneNumberController.verifyDirectorPhoneTest
// )

router.post('/director-phone', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return DirectorPhoneNumberController.verifyDirectorPhoneTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      DirectorPhoneNumberController.verifyDirectorPhone(req, res, next)
    })
  }
})

// router.post(
//   '/ecourt-cnr',
//   trimRequest.all,
//   verifyJWT,
//   EcourtByCNRController.verifyEcourtCNR
// )

// router.post(
//   '/test/ecourt-cnr',
//   trimRequest.all,
//   EcourtByCNRController.verifyEcourtCNRTest
// )

router.post('/ecourt-cnr', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return EcourtByCNRController.verifyEcourtCNRTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      EcourtByCNRController.verifyEcourtCNR(req, res, next)
    })
  }
})

// router.post(
//   '/electricity-bill-details',
//   trimRequest.all,
//   verifyJWT,
//   ElectricityBillController.verifyElectricityDetails
// )

// router.post(
//   '/test/electricity-bill-details',
//   trimRequest.all,
//   ElectricityBillController.verifyElectricityDetailsTest
// )

router.post('/electricity-bill-details', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return ElectricityBillController.verifyElectricityDetailsTest(
      req,
      res,
      next
    )
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      ElectricityBillController.verifyElectricityDetails(req, res, next)
    })
  }
})

// router.post(
//   '/employment-history-uan',
//   trimRequest.all,
//   verifyJWT,
//   EmploymentHistoryController.verifyEmploymentHistory
// )

// router.post(
//   '/test/employment-history-uan',
//   trimRequest.all,
//   EmploymentHistoryController.verifyEmploymentHistoryTest
// )

router.post('/employment-history-uan', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return EmploymentHistoryController.verifyEmploymentHistoryTest(
      req,
      res,
      next
    )
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      EmploymentHistoryController.verifyEmploymentHistory(req, res, next)
    })
  }
})

router.post(
  '/employment-history-wage-month',
  trimRequest.all,
  (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      // Skip JWT verification and go directly to test controller
      return EmploymentHistoryWithWageMonthController.verifyEmploymentHistoryTest(
        req,
        res,
        next
      )
    } else {
      // Verify JWT and continue to the real controller
      verifyJWT(req, res, () => {
        EmploymentHistoryWithWageMonthController.verifyEmploymentHistory(
          req,
          res,
          next
        )
      })
    }
  }
)

router.post(
  '/employment-history-advance',
  trimRequest.all,
  (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      // Skip JWT verification and go directly to test controller
      return EmploymentHistoryAdvanceController.verifyEmploymentHistoryTest(
        req,
        res,
        next
      )
    } else {
      // Verify JWT and continue to the real controller
      verifyJWT(req, res, () => {
        EmploymentHistoryAdvanceController.verifyEmploymentHistory(
          req,
          res,
          next
        )
      })
    }
  }
)

router.post('/employment-api', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    verifyJWT(req, res, () => {
      EmploymentHistoryAdvanceController.verifyEmploymentHistory(req, res, next)
    })
  }
})

router.post('/ccrv-generate-request', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return ccrvController.ccrvUnifiedRequestTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      ccrvController.ccrvUnifiedRequest(req, res, next)
    })
  }
})

router.get(
  '/ccrv/verification/:transactionId',
  verifyJWT,
  trimRequest.all,
  ccrvController.getVerificationStatus
)
router.get('/ccrv', verifyJWT, trimRequest.all, ccrvController.getAllCcrv)

router.get(
  '/ccrv/callback',
  trimRequest.all,
  ccrvController.verificationCallback
)

router.post('/ccrv-verify-request', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return ccrvController.fecthCCRVRequestTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      ccrvController.ccrvFetchRequest(req, res, next)
    })
  }
})

// router.post(
//   '/fastag-rc',
//   trimRequest.all,
//   verifyJWT,
//   FastagRCController.verifyFastagRCDetails
// )

// router.post(
//   '/test/fastag-rc',
//   trimRequest.all,
//   FastagRCController.verifyFastagRCDetailsTest
// )

router.post('/fastag-rc', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return FastagRCController.verifyFastagRCDetailsTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      FastagRCController.verifyFastagRCDetails(req, res, next)
    })
  }
})

// router.post(
//   '/fastag-details',
//   trimRequest.all,
//   verifyJWT,
//   FastagVerificationController.verifyFastagDetails
// )

// router.post(
//   '/test/fastag-details',
//   trimRequest.all,
//   FastagVerificationController.verifyFastagDetailsTest
// )

router.post('/fastag-details', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return FastagVerificationController.verifyFastagDetailsTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      FastagVerificationController.verifyFastagDetails(req, res, next)
    })
  }
})

// router.post(
//   '/fetch-upi-details',
//   trimRequest.all,
//   verifyJWT,
//   FetchUPIDetailsController.verifyUPIDetails
// )

// router.post(
//   '/test/fetch-upi-details',
//   trimRequest.all,
//   FetchUPIDetailsController.verifyUPIDetailsTest
// )

router.post('/fetch-upi-details', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return FetchUPIDetailsController.verifyUPIDetailsTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      FetchUPIDetailsController.verifyUPIDetails(req, res, next)
    })
  }
})

// router.post(
//   '/mobile-to-rc',
//   trimRequest.all,
//   verifyJWT,
//   VerifyRCWithMobileController.verifyRC
// )

// router.post(
//   '/test/mobile-to-rc',
//   trimRequest.all,
//   VerifyRCWithMobileController.verifyRCTest
// )

router.post('/mobile-to-rc', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return VerifyRCWithMobileController.verifyRCTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      VerifyRCWithMobileController.verifyRC(req, res, next)
    })
  }
})

// router.post(
//   '/mobile-to-bank',
//   verifyJWT,
//   trimRequest.all,
//   VerifyBankWithMobileController.verifyBankDetails
// )

// router.post(
//   '/test/mobile-to-bank',
//   trimRequest.all,
//   VerifyBankWithMobileController.verifyBankDetailsTest
// )
router.post('/mobile-to-bank', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return VerifyBankWithMobileController.verifyBankDetailsTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      VerifyBankWithMobileController.verifyBankDetails(req, res, next)
    })
  }
})

// router.post(
//   '/pan-to-uan',
//   trimRequest.all,
//   verifyJWT,
//   PANToUANController.verifyUANWithPAN
// )
router.post('/pan-to-uan', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return PANToUANController.verifyUANWithPANTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      PANToUANController.verifyUANWithPAN(req, res, next)
    })
  }
})

router.post('/pan-advance-verification', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return PANAdvanceController.verifyPanCardTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      PANAdvanceController.verifyPanCard(req, res, next)
    })
  }
})
router.post('/pan-udyam-msme-status', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return PANUDYAMMSMEController.verifyPANUDYAMMSMEStatusTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      PANUDYAMMSMEController.verifyPANUDYAMMSMEStatus(req, res, next)
    })
  }
})

router.post(
  '/mobile-to-uan',
  trimRequest.all,
  verifyJWT,
  MobileToUANController.verifyUANWithMobile
)

router.post('/mobile-to-uan', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return MobileToUANController.verifyUANWithMobile(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      MobileToUANController.verifyUANWithMobile(req, res, next)
    })
  }
})

// router.post(
//   '/passport',
//   trimRequest.all,
//   verifyJWT,
//   verifyPassportController.verifPassport
// )

// router.post(
//   '/test/passport',
//   trimRequest.all,
//   verifyPassportController.verifyPassportTest
// )

router.post('/passport', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return verifyPassportController.verifyPassportTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      verifyPassportController.verifPassport(req, res, next)
    })
  }
})

// router.post(
//   '/rc-to-mobile',
//   trimRequest.all,
//   verifyJWT,
//   VerifyMobileWithRCController.verifyMobile
// )

// router.post(
//   '/test/rc-to-mobile',
//   trimRequest.all,
//   VerifyMobileWithRCController.verifyMobileTest
// )

router.post('/rc-to-mobile', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return VerifyMobileWithRCController.verifyMobileTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      VerifyMobileWithRCController.verifyMobile(req, res, next)
    })
  }
})

// router.post(
//   '/ration-card',
//   trimRequest.all,
//   verifyJWT,
//   rationCardVerificationController.verifyRationCard
// )

// router.post(
//   '/test/ration-card',
//   trimRequest.all,
//   rationCardVerificationController.verifyRationCardTest
// )

router.post('/ration-card', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return rationCardVerificationController.verifyRationCardTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      rationCardVerificationController.verifyRationCard(req, res, next)
    })
  }
})

// router.post(
//   '/tan',
//   trimRequest.all,
//   verifyJWT,
//   TanVerifcationController.verifyTANDetails
// )

// router.post(
//   '/test/tan',
//   trimRequest.all,
//   TanVerifcationController.verifyTANDetailsTest
// )

router.post('/tan', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return TanVerifcationController.verifyTANDetailsTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      TanVerifcationController.verifyTANDetails(req, res, next)
    })
  }
})

// router.post(
//   '/tan-company-search',
//   trimRequest.all,
//   verifyJWT,
//   TanCompanySearchController.searchCompanyTan
// )

// router.post(
//   '/test/tan-company-search',
//   trimRequest.all,
//   TanCompanySearchController.searchCompanyTanTest
// )

router.post('/tan-company-search', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return TanCompanySearchController.searchCompanyTanTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      TanCompanySearchController.searchCompanyTan(req, res, next)
    })
  }
})
// router.post(
//   '/telecom-verification',
//   trimRequest.all,
//   verifyJWT,
//   TelecomVerifcationController.verifyTelecomDetails
// )

// router.post(
//   '/test/telecom-verification',
//   trimRequest.all,
//   TelecomVerifcationController.verifyTelecomDetailsTest
// )

router.post('/telecom-verification', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return TelecomVerifcationController.verifyTelecomDetailsTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      TelecomVerifcationController.verifyTelecomDetails(req, res, next)
    })
  }
})

// router.post(
//   '/tin-verification',
//   trimRequest.all,
//   verifyJWT,
//   TINVerifcationController.verifyTINDetails
// )

// router.post(
//   '/test/tin-verification',
//   trimRequest.all,
//   TINVerifcationController.verifyTINDetailsTest
// )

router.post('/tin-verification', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return TINVerifcationController.verifyTINDetailsTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      TINVerifcationController.verifyTINDetails(req, res, next)
    })
  }
})

// router.post(
//   '/udyog-aadhaar',
//   trimRequest.all,
//   verifyJWT,
//   UdyogAadhaarVerifcationController.verifyUdyogAadhaar
// )

// router.post(
//   '/test/udyog-aadhaar',
//   trimRequest.all,
//   UdyogAadhaarVerifcationController.verifyUdyogAadhaarTest
// )

router.post('/udyog-aadhaar', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return UdyogAadhaarVerifcationController.verifyUdyogAadhaarTest(
      req,
      res,
      next
    )
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      UdyogAadhaarVerifcationController.verifyUdyogAadhaar(req, res, next)
    })
  }
})

// router.post(
//   '/echallan',
//   trimRequest.all,
//   verifyJWT,
//   EchallanController.verifyEchallan
// )

// router.post(
//   '/test/echallan',
//   trimRequest.all,
//   EchallanController.verifyEchallanTest
// )

router.post('/echallan', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return EchallanController.verifyEchallanTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      EchallanController.verifyEchallan(req, res, next)
    })
  }
})

// router.post(
//   '/aadhaar-pan-link',
//   trimRequest.all,
//   verifyJWT,
//   VerifyPanWithAadhaarController.VerifyPanWithAadhaar
// )

// router.post(
//   '/test/aadhaar-pan-link',
//   trimRequest.all,
//   VerifyPanWithAadhaarController.VerifyPanWithAadhaarTest
// )

router.post('/aadhaar-pan-link', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return VerifyPanWithAadhaarController.VerifyPanWithAadhaarTest(
      req,
      res,
      next
    )
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      VerifyPanWithAadhaarController.VerifyPanWithAadhaar(req, res, next)
    })
  }
})
// router.post(
//   '/aadhaar-uan-link',
//   trimRequest.all,
//   verifyJWT,
//   VerifyUANWithAadhaarController.VerifyUANWithAadhaar
// )

// router.post(
//   '/test/aadhaar-uan-link',
//   trimRequest.all,
//   VerifyUANWithAadhaarController.VerifyUANWithAadhaarTest
// )
router.post('/aadhaar-uan-link', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return VerifyUANWithAadhaarController.VerifyUANWithAadhaarTest(
      req,
      res,
      next
    )
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      VerifyUANWithAadhaarController.VerifyUANWithAadhaar(req, res, next)
    })
  }
})
router.post('/din-verification', trimRequest.all, (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // Skip JWT verification and go directly to test controller
    return DirectorVerification.verifyDINTest(req, res, next)
  } else {
    // Verify JWT and continue to the real controller
    verifyJWT(req, res, () => {
      DirectorVerification.verifyDIN(req, res, next)
    })
  }
})

router.post(
  '/dynamic',
  trimRequest.all,
  verifyJWT,
  process.env.TEST_MODE === 'true'
    ? DynamicController.verifyDocumentTest
    : DynamicController.verifyDocument
)
router.post('/dashboard-analytics', trimRequest.all, getDashboardAnalytics)

module.exports = router

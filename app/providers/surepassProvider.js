// providers/surepassProvider.js
const BaseProvider = require('./baseProvider')
const { DOCUMENT_TYPES } = require('../constants/documentTypes.js')

class SurepassProvider extends BaseProvider {
  getEndpoints() {
    return {
      [DOCUMENT_TYPES.AADHAAR]: '/aadhaar-validation/aadhaar-validation',
      [DOCUMENT_TYPES.PAN]: '/pan/verify',
      [DOCUMENT_TYPES.VOTER_ID]: '/voter-id/voter-id',
      [DOCUMENT_TYPES.DRIVING_LICENSE]: '/driving-license/driving-license',
      [DOCUMENT_TYPES.RCTEXT]: '/rc/rc-full',
      [DOCUMENT_TYPES.PAN_LITE]: '/pan/pan',
      [DOCUMENT_TYPES.PAN_COMPREHENSIVE]: '/pan/pan-comprehensive',
      [DOCUMENT_TYPES.BANK_VERIFICACTION]: '/bank-verification',
      [DOCUMENT_TYPES.BANK_VERIFICACTION_PENNYLESS]:
        '/bank-verification/pennyless',
      [DOCUMENT_TYPES.CORPORATE_CIN]: '/corporate/company-details',
      [DOCUMENT_TYPES.CORPORATE_GSTIN]: '/corporate/gstin',
      [DOCUMENT_TYPES.CREDIT_REPORT]: '/credit-report-v2/fetch-report',
      [DOCUMENT_TYPES.CREDIT_REPORT_PDF]: '/credit-report-v2/fetch-pdf-report',
      [DOCUMENT_TYPES.DIRECTOR_PHONE]: '/corporate/director-phone',
      [DOCUMENT_TYPES.ECOURT_CNR]: '/ecourts/ecourt-cnr-search',
      [DOCUMENT_TYPES.ELECTRICITY_BILL_DETAILS]: '/utility/electricity/',
      [DOCUMENT_TYPES.EMPLOYMENT_HISTORY_WAGE_MONTH]:
        '/income/employment-history-uan',
      [DOCUMENT_TYPES.FASTAG_RC]: '/fastag/fastag-to-rc',
      [DOCUMENT_TYPES.FASTAG_VERIFICATION]: '/fastag/verification',
      [DOCUMENT_TYPES.FIND_UPI_ID]: '/bank-verification/find-upi-id',
      [DOCUMENT_TYPES.MOBILE_TO_RC]: '/rc/mobile-number-to-rc',
      [DOCUMENT_TYPES.MOBILE_TO_BANK]: '/mobile-to-bank-details/verification',
      [DOCUMENT_TYPES.MOBILE_TO_UAN]: '/income/epfo/find-uan',
      [DOCUMENT_TYPES.PASSPORT]: '/passport/passport/passport-details',
      [DOCUMENT_TYPES.RC_MOBILE_NUMBER]: '/rc/rc-to-mobile-number',
      [DOCUMENT_TYPES.RATION_CARD]: '/ration-card/verify',
      [DOCUMENT_TYPES.TAN]: '/tan/',
      [DOCUMENT_TYPES.TAN_COMPANY_SEARCH]: '/tan/company-search',
      [DOCUMENT_TYPES.TELECOM_VERIFICATION]: '/telecom/telecom-verification',
      [DOCUMENT_TYPES.TIN_VERIFICATION]: '/tin/tin-verification',
      [DOCUMENT_TYPES.UDYOG_AADHAAR]: '/corporate/udyog-aadhaar',
      [DOCUMENT_TYPES.ECHALLAN]: '/rc/rc-related/challan-details',
      [DOCUMENT_TYPES.AADHAAR_PAN_LINK_CHECK]: '/pan/aadhaar-pan-link-check',
      [DOCUMENT_TYPES.AADHAAR_TO_UAN]: '/income/epfo/aadhaar-to-uan'
    }
  }

  getHeaders() {
    return {
      ...super.getHeaders(),
      Authorization: `Bearer ${this.token}`
    }
  }
}

module.exports = SurepassProvider

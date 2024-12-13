const BaseProvider = require('../providers/baseProvider')
const { DOCUMENT_TYPES } = require('../constants/documentTypes.js')

class SurepassProvider extends BaseProvider {
  getEndpoints() {
    return {
      // aadhaar: '/aadhaar-validation/aadhaar-validation',
      // pan: '/pan/verify',
      // voter_id: '/voter-id/voter-id',
      // driving_license: '/driving-license/driving-license',
      // rc_text: '/rc/rc-full',
      // pan_lite: '/pan/pan',
      // pan_comprehensive: '/pan/pan-comprehensive',
      // bank_verification: '/bank-verification',
      // bank_verification_pennyless: '/bank-verification/pennyless',
      // corporate_cin: '/corporate/company-details',
      // corporate_gstin: '/corporate/gstin',
      // credit_report: '/credit-report-v2/fetch-report'
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
      [DOCUMENT_TYPES.CREDIT_REPORT]: '/credit-report-v2/fetch-report'
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

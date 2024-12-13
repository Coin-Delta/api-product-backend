const BaseProvider = require('../providers/baseProvider')

class SurepassProvider extends BaseProvider {
  getEndpoints() {
    return {
      aadhaar: '/aadhaar-validation/aadhaar-validation',
      pan: '/pan/verify',
      voter_id: '/voter-id/voter-id',
      driving_license: '/driving-license/driving-license',
      rc_text: '/rc/rc-full',
      pan_lite: '/pan/pan',
      pan_comprehensive: '/pan/pan-comprehensive',
      bank_verification: '/bank-verification',
      bank_verification_pennyless: '/bank-verification/pennyless',
      corporate_cin: '/corporate/company-details',
      corporate_gstin: '/corporate/gstin',
      credit_report: '/credit-report-v2/fetch-report',
      director_phone: '/corporate/director-phone',
      ecourt_cnr: '/ecourts/ecourt-cnr-search',
      electricity_bill: '/utility/electricity/',
      employment_history_uan: '/income/employment-history-uan',
      fastag_rc: '/fastag/fastag-to-rc',
      fastag_verification: '/fastag/verification',
      find_upi_id: '/bank-verification/find-upi-id'
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

// transformers/surepassTransformer.js
const { DOCUMENT_TYPES } = require('../../constants/documentTypes.js')
const { STATUS_CODES } = require('../../constants/statusCodes.js')

class SurepassTransformer {
  static getErrorMapping() {
    return {
      'id not found': {
        code: STATUS_CODES.NOT_FOUND,
        message: 'Document ID not found'
      },
      'invalid token': {
        code: STATUS_CODES.UNAUTHORIZED,
        message: 'Authentication failed with provider'
      },
      'insufficient balance': {
        code: STATUS_CODES.PAYMENT_REQUIRED,
        message: 'Insufficient balance in Surepass account'
      },
      'invalid document': {
        code: STATUS_CODES.BAD_REQUEST,
        message: 'Invalid document details provided'
      },
      'service unavailable': {
        code: STATUS_CODES.SERVICE_UNAVAILABLE,
        message: 'Surepass service temporarily unavailable'
      }
    }
  }

  static transformError(documentType, error) {
    const errorMapping = this.getErrorMapping()
    const errorMessage = error.toLowerCase()

    const matchedError = Object.entries(errorMapping).find(([key]) =>
      errorMessage.includes(key)
    )

    if (matchedError) {
      const [, errorDetails] = matchedError
      return {
        success: false,
        data: null,
        status: errorDetails.code,
        error: errorDetails.message
      }
    }

    return {
      success: false,
      data: null,
      status: STATUS_CODES.BAD_REQUEST,
      error: `${documentType} verification failed: ${error}`
    }
  }

  static getDocumentTransformers() {
    return {
      [DOCUMENT_TYPES.AADHAAR]: (data) => ({
        userId: data.client_id,
        ageBand: data.age_range,
        aadhaarNumber: data.aadhaar_number,
        state: data.state,
        gender: data.gender,
        mobileLastDigit: data.last_digits,
        isMobile: data.is_mobile,
        remarks: data.remarks,
        lessInfo: data.less_info
      }),

      [DOCUMENT_TYPES.PAN_LITE]: (data) => ({
        client_id: data.client_id,
        category: data.category,
        panNumber: data.pan_number,
        fullName: data.full_name
      }),

      [DOCUMENT_TYPES.VOTER_ID]: (data) => ({
        clientId: data.client_id,
        epicNumber: data.epic_no,
        gender: data.gender,
        age: data.age,
        dob: data.dob,
        name: data.name,
        area: data.area,
        state: data.state,
        relationType: data.relation_type,
        epicNo: data.epic_no,
        relationName: data.relation_name,
        houseNumber: data,
        relationName: data.relation_name
      }),

      [DOCUMENT_TYPES.DRIVING_LICENSE]: (data) => ({
        clientId: data.client_id,
        licenseNumber: data.license_number,
        state: data.state,
        name: data.name,
        permanentAddress: data.permanent_address,
        permanentZip: data.permanent_zip,
        temporaryAddress: data.temporary_address,
        temporaryZip: data.temporary_zip,
        citizenship: data.citizenship,
        olaName: data.ola_name,
        olaCode: data.ola_code,
        gender: data.gender,
        fatherOrHusbandName: data.father_or_husband_name,
        dob: data.dob,
        doe: data.doe,
        transportDateOfExpiry: data.transport_doe,
        doi: data.doi,
        transportDoi: data.transport_doi,
        profileImage: data.profile_image,
        hasImage: data.has_image,
        bloodGroup: data.blood_group,
        vehicleClasses: data.vehicle_classes,
        lessInfo: data.lessless_info
      })

      // Add more document types as needed
    }
  }

  static transform(documentType, providerResponse) {
    // Handle error case
    if (!providerResponse.success) {
      return this.transformError(documentType, providerResponse.error)
    }

    // Get transformer for document type
    const transformers = this.getDocumentTransformers()
    const transformer = transformers[documentType]

    // If no specific transformer found, return normalized raw data
    if (!transformer) {
      return {
        success: true,
        data: providerResponse.data,
        status: providerResponse.status || STATUS_CODES.SUCCESS
      }
    }

    // Transform the data
    const transformedData = transformer(providerResponse.data)
    return {
      success: true,
      data: transformedData,
      status: providerResponse.status || STATUS_CODES.SUCCESS
    }
  }
}

module.exports = SurepassTransformer

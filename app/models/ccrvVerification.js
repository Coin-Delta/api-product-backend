// models/ccrvVerification.js
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ccrvVerificationSchema = new mongoose.Schema(
  {
    // Request data
    name: { type: String, required: true },
    fatherName: { type: String },
    address: { type: String },
    dateOfBirth: { type: String },

    // Client reference
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BCA',
      required: true,
      index: true
    },

    // API response data
    transactionId: { type: String, index: true }, // Used as referenceId to track the verification

    // Status tracking
    status: {
      type: String,
      enum: ['REQUESTED', 'PROCESSING', 'COMPLETED', 'FAILED'],
      default: 'REQUESTED'
    },

    // Callback response data (populated when callback is received)
    callbackReceived: { type: Boolean, default: false },
    callbackTimestamp: { type: Date },
    callbackData: {
      code: String,
      message: String,
      ccrv_status: String,
      ccrv_data: {
        case_count: Number,
        cases: [
          {
            algorithm_risk: String,
            father_match_type: String,
            name_match_type: String,
            case_id: String,
            case_type_name: String,
            link: String,
            md5: String,
            unique_case_id: String,
            case_category: String,
            case_decision_date: String,
            case_number: String,
            case_status: String,
            case_type: String,
            case_year: String,
            cnr: String,
            decision_date: String,
            district_name: String,
            filing_date: String,
            filing_number: String,
            filing_year: String,
            first_hearing_date: String,
            name: String,
            nature_of_disposal: String,
            oparty: String,
            registration_date: String,
            registration_number: String,
            registration_year: String,
            source: String,
            state_name: String,
            type: Number,
            under_acts: String,
            under_sections: String
          }
        ]
      }
    },

    // Error tracking
    error: { type: String },
    retryCount: { type: Number, default: 0 }
  },
  { timestamps: true }
)

// Apply the mongoose-paginate-v2 plugin to the schema
ccrvVerificationSchema.plugin(mongoosePaginate)

// Create index on transactionId for faster lookups
ccrvVerificationSchema.index({ transactionId: 1 })
// Create compound index for clientId and createdAt for faster filtered queries
ccrvVerificationSchema.index({ clientId: 1, createdAt: -1 })

module.exports = mongoose.model('CCRVVerification', ccrvVerificationSchema)

const mongoose = require('mongoose')
const { TRANSACTION_TYPES } = require('../constants/transactionTypes.js')

const apiTransactionSchema = new mongoose.Schema(
  {
    apiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'API',
      required: true
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'APIVendor',
      required: true
    },
    requestData: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    responseData: {
      // responseData
      type: mongoose.Schema.Types.Mixed
    },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'PENDING'
    },
    httpStatus: {
      type: Number
    },
    errorMessage: {
      type: String
    },
    requestedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date
    },
    clientId: {
      type: String,
      required: true
    },
    transactionType: {
      type: String,
      enum: [TRANSACTION_TYPES.CREDIT, TRANSACTION_TYPES.DEBIT],
      require: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Add indexes for performance
apiTransactionSchema.index({ apiId: 1, vendorId: 1, status: 1 })
apiTransactionSchema.index({ requestedAt: -1 })

module.exports = mongoose.model('APITransaction', apiTransactionSchema)

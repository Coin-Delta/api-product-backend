const mongoose = require('mongoose')

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
      type: mongoose.Schema.Types.Mixed
    },
    responseData: {
      type: mongoose.Schema.Types.Mixed
    },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'PENDING'
    },
    price: {
      type: Number
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

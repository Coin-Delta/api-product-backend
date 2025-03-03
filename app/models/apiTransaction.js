// Updated Transaction Schema with mongoose-paginate-v2

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { TRANSACTION_TYPES } = require('../constants/transactionTypes.js')

const apiTransactionSchema = new mongoose.Schema(
  {
    apiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'API'
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'APIVendor'
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BCA',
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
      enum: ['PENDING', 'SUCCESS', 'FAILED']
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
    },
    transactionType: {
      type: String,
      enum: [
        TRANSACTION_TYPES.CREDIT,
        TRANSACTION_TYPES.DEBIT,
        TRANSACTION_TYPES.RECHARGE
      ]
    },
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    initiatedByRoleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
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
apiTransactionSchema.index({ clientId: 1 })

// Add pagination plugin
apiTransactionSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('APITransaction', apiTransactionSchema)

const mongoose = require('mongoose')

const apiConfigSchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true
    },
    documentName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { _id: false }
)

const apiWallet = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    balance: {
      type: Number,
      default: 0
    },
    apiConfig: [apiConfigSchema]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Add index for performance
apiWallet.index({ _id: 1 })

module.exports = mongoose.model('apiwallet', apiWallet)

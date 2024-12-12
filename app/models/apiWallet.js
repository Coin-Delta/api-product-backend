const mongoose = require('mongoose')

const apiWallet = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BCA',
      required: true,
      index: true
    },
    balance: {
      type: Number
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Add index for performance
// apiWallet.index({ _id: 1 })

module.exports = mongoose.model('APIWallet', apiWallet)

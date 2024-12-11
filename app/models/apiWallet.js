const mongoose = require('mongoose')

const apiWalletSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('APIWallet', apiWalletSchema, 'wallets')

// services/wallet.service.js
const APIWallet = require('../models/apiWallet')
class WalletService {
  static async findWallet(clientId) {
    // Only select needed fields for performance
    return await APIWallet.findOne({ clientId }).select('_id balance')
  }

  static async checkAndDeductBalance(clientId, amount) {
    const wallet = await this.findWallet(clientId)
    if (!wallet) {
      throw new Error('Wallet not found')
    }

    if (wallet.balance < amount) {
      throw new Error('Insufficient balance')
    }

    return wallet
  }

  static async deductBalance(wallet, amount) {
    // Using the pre-save middleware, only balance updates are allowed
    wallet.balance -= amount
    return wallet.save()
  }
}

module.exports = WalletService

// services/wallet.service.js
const APIWallet = require('../models/apiWallet')
const WalletError = require('../utils/error/walletError.js')
const { STATUS_CODES } = require('../constants/statusCodes.js')
const { TRANSACTION_TYPES } = require('../constants/transactionTypes.js')

class WalletService {
  static async findWallet(clientId) {
    // Only select needed fields for performance
    return await APIWallet.findOne({ clientId }).select('_id balance')
  }

  // static async checkAndDeductBalance(clientId, amount) {
  //   const wallet = await this.findWallet(clientId)
  //   if (!wallet) {
  //     throw new Error('Wallet not found')
  //   }

  //   if (wallet.balance < amount) {
  //     throw new Error('Insufficient balance')
  //   }

  //   return wallet
  // }

  // static async deductBalance(wallet, amount) {
  //   // Using the pre-save middleware, only balance updates are allowed
  //   wallet.balance -= amount
  //   return wallet.save()
  // }

  static async getWalletAndCheckBalance(clientId, price) {
    const wallet = await WalletService.findWallet(clientId)
    // const wallets = await apiWallet.find({})
    // console.log('all wallets:', wallets)
    // let wallet
    // console.log('clientid:', clientId)
    // console.log('type of clientid:', typeof wallets[0].clientId)
    if (!wallet) {
      throw new WalletError(STATUS_CODES.NOT_FOUND, 'Wallet not found')
    }

    // Check balance
    if (wallet.balance < price) {
      throw new WalletError(
        STATUS_CODES.UNPROCESSABLE_ENTITY,
        'Insufficient balance'
      )
    }

    // Return  wallet
    return wallet
  }

  static async changeWallet(
    // { clientId, price, transactionType, initiatedBy, initiatedByRole },
    { clientId, price, transactionType },
    session
  ) {
    try {
      console.log('changeWallet called')
      console.log('clientid,price,tran type:', clientId, price, transactionType)
      const wallet = await WalletService.findWallet(clientId)

      console.log('wallet value:', wallet)
      if (!wallet) {
        throw new WalletError(STATUS_CODES.NOT_FOUND, 'Wallet not found')
      }
      // console.log('wallet found:', wallet)
      // Validate access
      // await this.validateAccess(wallet, initiatedBy, initiatedByRole)

      // in case of debit it will be -ve and for credit => +ve
      if (transactionType === TRANSACTION_TYPES.DEBIT) {
        price = -price
      }
      const updatedWallet = await APIWallet.findOneAndUpdate(
        { clientId },
        { $inc: { balance: price } },
        { new: true, session }
      )
      console.log('updatedWallet found:', updatedWallet)

      return {
        wallet: updatedWallet,
        afterBalance: updatedWallet.balance
      }
    } catch (err) {
      console.log('error inside change wallet:', err)
      throw err
    }
  }
}

module.exports = WalletService

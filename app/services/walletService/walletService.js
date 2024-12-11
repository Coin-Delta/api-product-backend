const { STATUS_CODES } = require('../../constants/statusCodes.js')
const { TRANSACTION_TYPES } = require('../../constants/transactionTypes.js')
const apiWallet = require('../../models/apiWallet.js')
const WalletError = require('../../utils/error/walletError.js')

class WalletService {
  static async getWalletAndCheckBalance(clientId, price) {
    const wallet = await apiWallet.findOne({ clientId })
    // const wallets = await apiWallet.find({})
    // console.log('all wallets:', wallets)
    // let wallet
    // console.log('clientid:', clientId)
    // console.log('type of clientid:', typeof wallets[0].clientId)
    if (!wallet) {
      throw new WalletError('Wallet not found', STATUS_CODES.NOT_FOUND)
    }

    // const price = this.getApiPrice(wallet, apiType)
    // const price = await this.getPriceByApiType(apiType)

    // Check balance
    if (wallet.balance < price) {
      throw new WalletError(
        'Insufficient balance',
        STATUS_CODES.UNPROCESSABLE_ENTITY
      )
    }

    // Return  wallet
    return wallet
  }

  static async changeWallet(
    clientId,
    price,
    transactionType,
    initiatedBy,
    initiatedByRole,
    session
  ) {
    const wallet = await apiWallet.findOne({ clientId })
    if (!wallet) {
      throw new WalletError('Wallet not found', STATUS_CODES.NOT_FOUND)
    }

    // Validate access
    // await this.validateAccess(wallet, initiatedBy, initiatedByRole)

    // let price = await this.getPriceByApiType(apiType)

    // in case of debit it will be -ve and for credit => +ve
    if (transactionType === TRANSACTION_TYPES.DEBIT) {
      price = -price
    }
    const updatedWallet = await apiWallet.findOneAndUpdate(
      { clientId },
      { $inc: { balance: price } },
      { new: true, session }
    )

    return updatedWallet
  }
}

module.exports = WalletService

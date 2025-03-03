const APIWallet = require('../../../models/apiWallet')
const APITransaction = require('../../../models/apiTransaction')
const { TRANSACTION_TYPES } = require('../../../constants/transactionTypes.js')

// Update client wallet balance by adding amount from request and log transaction
const updateClientWalletBalance = async (req, res) => {
  try {
    const { clientId } = req.params
    const { amount: balance, initiatedBy, initiatedByRoleId } = req.body
    // Validate input
    if (typeof balance !== 'number' || isNaN(balance)) {
      return res.status(400).json({ message: 'Balance must be a valid number' })
    }

    // Find and update the wallet
    const wallet = await APIWallet.findOne({ clientId })

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' })
    }

    // Add the balance from request to existing balance
    wallet.balance += balance
    await wallet.save()

    // Log the transaction
    const transaction = new APITransaction({
      clientId,
      price: balance,
      transactionType: TRANSACTION_TYPES.RECHARGE,
      status: 'SUCCESS',
      requestedAt: new Date(),
      completedAt: new Date(),
      initiatedBy: req.user._id || null,
      initiatedByRoleId: req.user._id || null
    })

    await transaction.save()

    res.json({
      message: 'Wallet balance updated successfully',
      wallet,
      transaction: {
        transactionId: transaction._id,
        transactionType: transaction.transactionType,
        amount: transaction.price,
        status: transaction.status
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = updateClientWalletBalance

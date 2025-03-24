const ApiWallet = require('../../models/apiWallet')

const updateApiWalletBalance = async (req, res) => {
  const { amount } = req.body
  const clientId = req.user.bcaId

  if (!amount) {
    return res.status(400).json({
      success: false,
      message: 'Please provide amount to update'
    })
  }

  const wallet = await ApiWallet.findOne({ clientId })

  if (!wallet) {
    return res.status(404).json({
      success: false,
      message: `No wallet found for client ${clientId}`
    })
  }

  wallet.balance += Number(amount)
  await wallet.save()

  res.json({
    success: true,
    wallet: {
      clientId: wallet.clientId,
      balance: wallet.balance
    }
  })
}

module.exports = updateApiWalletBalance

const APIWallet = require('../../../models/apiWallet')

// Get client wallet with API config
const getClientApiWalletConfig = async (req, res) => {
  try {
    const { clientId } = req.params
    const wallet = await APIWallet.findOne({ clientId: clientId })
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' })
    }
    res.json(wallet)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = getClientApiWalletConfig

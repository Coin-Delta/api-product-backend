const APIWallet = require('../../models/apiWallet')

const getClientWallet = async (req, res) => {
  try {
    const { bcaId: clientId } = req.user

    // Find client wallet using Mongoose
    const clientWallet = await APIWallet.findOne(
      { clientId },
      'clientId balance' // Only select these fields
    )

    if (!clientWallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found for this client'
      })
    }

    return res.status(200).json({
      success: true,
      data: clientWallet
    })
  } catch (error) {
    console.error('Error fetching client wallet:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

module.exports = getClientWallet

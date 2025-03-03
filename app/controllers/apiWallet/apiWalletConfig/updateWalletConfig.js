const APIWallet = require('../../../models/apiWallet')

// Update client's API configuration
const updateClientApiConfig = async (req, res) => {
  try {
    const { apiConfig } = req.body
    // Validate apiConfig structure
    if (!Array.isArray(apiConfig)) {
      return res.status(400).json({ message: 'apiConfig must be an array' })
    }

    // Validate each config object
    for (const config of apiConfig) {
      if (
        !config.documentType ||
        !config.documentName ||
        typeof config.price !== 'number'
      ) {
        return res
          .status(400)
          .json({ message: 'Invalid config object structure' })
      }
    }

    const wallet = await APIWallet.findOneAndUpdate(
      { clientId: req.params.clientId },
      { $set: { apiConfig } },
      { new: true }
    )

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' })
    }

    res.json(wallet)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = updateClientApiConfig

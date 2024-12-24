const APIWallet = require('../../models/apiWallet.js')
const ResponseHelper = require('../../utils/responseHelper')

class APIWalletController {
  static async getClientAPIWalletBalance(req, res) {
    try {
      const { bcaId: clientId } = req.user
      const apiWallet = await APIWallet.findOne({ clientId }).select('balance')
      console.log(`balance of clientId - ${clientId} : ${apiWallet.balance}`)
      return ResponseHelper.success(
        res,
        apiWallet.balance,
        'API Wallet balance retrieved successfully'
      )
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }
}

module.exports = APIWalletController

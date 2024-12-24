const APITransaction = require('../../models/apiTransaction.js')
const ResponseHelper = require('../../utils/responseHelper')

class APITransactionController {
  static async getClientAPITransactions(req, res) {
    try {
      const { bcaId: clientId } = req.user
      const transactionLogs = await APITransaction.find({ clientId })
      console.log(
        `transaction logs of clientId - ${clientId} : ${transactionLogs}`
      )
      return ResponseHelper.success(
        res,
        transactionLogs,
        'API Transaction logs retrieved successfully'
      )
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }
}

module.exports = APITransactionController

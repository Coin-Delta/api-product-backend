// services/transaction.service.js
const APITransaction = require('../models/apiTransaction')
class TransactionService {
  static async createTransaction(apiId, vendorId, requestData, price) {
    return new APITransaction({
      apiId,
      vendorId,
      requestData,
      price,
      status: 'PENDING'
    }).save()
  }

  static async updateTransaction(transaction, result) {
    transaction.status = result.success ? 'SUCCESS' : 'FAILED'
    transaction.responseData = result.data
    transaction.httpStatus = result.status
    transaction.errorMessage = result.error
    transaction.completedAt = new Date()
    return transaction.save()
  }
}

module.exports = TransactionService

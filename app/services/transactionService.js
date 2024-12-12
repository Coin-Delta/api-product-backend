// services/transaction.service.js
const APITransaction = require('../models/apiTransaction')
const {
  TRANSACTION_STATUS_TYPES
} = require('../constants/transactionStatusTypes.js')
const DBError = require('../utils/error/dbError.js')
const { STATUS_CODES } = require('../constants/statusCodes.js')

class TransactionService {
  // static async createTransaction(apiId, vendorId, requestData, price) {
  //   return new APITransaction({
  //     apiId,
  //     vendorId,
  //     requestData,
  //     price,
  //     status: 'PENDING'
  //   }).save()
  // }

  static async createTransaction(
    { apiId, vendorId, requestData, price, transactionType, clientId },
    session
  ) {
    return new APITransaction({
      apiId,
      vendorId,
      requestData,
      price,
      status: TRANSACTION_STATUS_TYPES.PENDING,
      transactionType,
      clientId
    }).save({ session })
  }

  // static async updateTransaction(transaction, result) {
  //   transaction.status = result.success ? 'SUCCESS' : 'FAILED'
  //   transaction.responseData = result.data
  //   transaction.httpStatus = result.status
  //   transaction.errorMessage = result.error
  //   transaction.completedAt = new Date()
  //   return transaction.save()
  // }

  static async updateTransaction(transactionData, session) {
    const { _id, status, responseData, httpStatus, errorMessage, completedAt } =
      transactionData
    console.log('update trans data:', transactionData)

    // Update transaction
    const updatedTransactionLog = await APITransaction.findByIdAndUpdate(
      _id,
      {
        status,
        responseData,
        httpStatus,
        errorMessage,
        completedAt
      },
      { new: true, session }
    )
    if (!updatedTransactionLog) {
      // If no document was found, throw an error
      throw new DBError(STATUS_CODES.NOT_FOUND, 'Transaction log not found')
    }
    console.log('Updated transaction log:', updatedTransactionLog)
    return updatedTransactionLog
  }
}

module.exports = TransactionService

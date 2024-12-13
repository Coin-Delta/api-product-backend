// services/transaction.service.js
const APITransaction = require('../models/apiTransaction')
const {
  TRANSACTION_STATUS_TYPES
} = require('../constants/transactionStatusTypes.js')
const DBError = require('../utils/error/dbError.js')
const { STATUS_CODES } = require('../constants/statusCodes.js')

class TransactionService {
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

  static async updateTransaction(transactionData, session) {
    try {
      const {
        _id,
        status,
        responseData,
        httpStatus,
        errorMessage,
        completedAt
      } = transactionData
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
    } catch (error) {
      console.log('error updating transaction:', error)
      throw error
    }
  }
}

module.exports = TransactionService

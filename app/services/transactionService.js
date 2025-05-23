// services/transaction.service.js
const APITransaction = require('../models/apiTransaction')
// const {
//   TRANSACTION_STATUS_TYPES
// } = require('../constants/transactionStatusTypes.js')
const DBError = require('../utils/error/dbError.js')
const { STATUS_CODES } = require('../constants/statusCodes.js')

class TransactionService {
  static async createTransaction(
    {
      apiId,
      vendorId,
      requestData,
      price,
      transactionType,
      status,
      clientId,
      initiatedBy,
      initiatedByRoleId,
      httpStatus,
      remark,
      afterBalance,
      message,
      messageCode
    },
    session
  ) {
    console.log(
      'initiatedBy,initiatedByRoleId:',
      initiatedBy,
      initiatedByRoleId
    )
    return new APITransaction({
      apiId,
      vendorId,
      requestData,
      price,
      status,
      transactionType,
      clientId,
      initiatedBy,
      initiatedByRoleId,
      httpStatus,
      remark,
      afterBalance,
      message,
      messageCode
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
        remark,
        afterBalance,
        completedAt,
        message,
        messageCode
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
          remark,
          afterBalance,
          completedAt,
          message,
          messageCode
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

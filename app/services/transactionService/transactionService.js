const APITransaction = require('../../models/apiTransaction.js')

class TransactionService {
  static async logAPITransaction(transactionData, session) {
    try {
      const {
        apiId,
        vendorId,
        documentData,
        status,
        transactionType,
        price,
        clientId
      } = transactionData

      // Create transaction record
      console.log('transaction data:', transactionData)
      const transaction = new APITransaction({
        apiId,
        vendorId,
        requestData: documentData,
        status,
        transactionType,
        price,
        clientId
      })

      return await transaction.save({ session })
    } catch (err) {
      console.error('error saving transaction:', err)
      throw err // Re-throw the error to be handled by the caller
    }
  }

  static async updateAPITransaction(transactionData, session) {
    const { _id, status, responseData, httpStatus, errorMessage, completedAt } =
      transactionData
    console.log('update trans data:', transactionData)

    // Update transaction
    try {
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
        throw new Error('Transaction log not found')
      }
      console.log('Updated transaction log:', updatedTransactionLog)
      return updatedTransactionLog
    } catch (error) {
      console.error('Error updating transaction:', error)
      throw error // Re-throw the error to be handled by the caller
    }
  }
}

module.exports = TransactionService

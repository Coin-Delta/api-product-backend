const APITransaction = require('../../models/apiTransaction')
const API = require('../../models/api')
const mongoose = require('mongoose')
const ExcelJS = require('exceljs')

/**
 * Export client transactions to Excel with filtering
 * @route GET /clients/:clientId/transactions/export
 * @param {boolean} [testMode] - Set to true to get JSON response instead of Excel
 */
const exportClientTransactions = async (req, res) => {
  try {
    const { bcaId: clientId } = req.user

    // Validate clientId
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid client ID format'
      })
    }

    // Get query parameters
    const {
      from,
      to,
      transactionDate,
      apiId,
      status,
      transactionType,
      testMode
    } = req.query

    // Build filter query
    const query = { clientId: new mongoose.Types.ObjectId(clientId) }

    // Date filtering
    if (transactionDate) {
      const date = new Date(transactionDate)
      if (!isNaN(date.getTime())) {
        const start = new Date(date)
        start.setHours(0, 0, 0, 0)
        const end = new Date(date)
        end.setHours(23, 59, 59, 999)
        query.requestedAt = { $gte: start, $lte: end }
      }
    } else {
      const dateFilter = {}
      if (from) {
        const start = new Date(from)
        if (!isNaN(start.getTime())) {
          dateFilter.$gte = start
        }
      }
      if (to) {
        const end = new Date(to)
        if (!isNaN(end.getTime())) {
          end.setHours(23, 59, 59, 999)
          dateFilter.$lte = end
        }
      }
      if (Object.keys(dateFilter).length > 0) {
        query.requestedAt = dateFilter
      }
    }

    // Other filters
    if (apiId) {
      const apiIds = apiId.split(',').map((id) => id.trim())
      const validApiIds = apiIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      )
      if (validApiIds.length > 0) {
        query.apiId = {
          $in: validApiIds.map((id) => new mongoose.Types.ObjectId(id))
        }
      }
    }

    if (status) {
      query.status = status
    }

    if (transactionType) {
      query.transactionType = transactionType
    }

    // Get transactions
    const transactions = await APITransaction.find(query)
      .populate([
        { path: 'initiatedBy', select: 'name email' },
        { path: 'apiId', select: 'name' }
      ])
      .sort({ requestedAt: -1 })
      .lean()

    // TEST MODE
    if (testMode === 'true') {
      return res.json({
        success: true,
        count: transactions.length,
        queryParams: req.query,
        appliedFilters: query,
        transactions: transactions.map((t) => ({
          ...t,
          apiName: t.apiId?.name || null,
          initiatedByName: t.initiatedBy?.name || 'N/A'
        }))
      })
    }

    // PRODUCTION MODE: Return Excel file (existing code remains the same)
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Transactions')

    worksheet.columns = [
      { header: 'Transaction ID', key: '_id', width: 25 },
      { header: 'API Name', key: 'apiName', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Type', key: 'transactionType', width: 15 },
      {
        header: 'Price',
        key: 'price',
        width: 15,
        style: { numFmt: '#,##0.00' }
      },
      { header: 'HTTP Status', key: 'httpStatus', width: 15 },
      {
        header: 'Requested At',
        key: 'requestedAt',
        width: 20,
        style: { numFmt: 'yyyy-mm-dd hh:mm:ss' }
      },
      {
        header: 'Completed At',
        key: 'completedAt',
        width: 20,
        style: { numFmt: 'yyyy-mm-dd hh:mm:ss' }
      },
      { header: 'Initiated By', key: 'initiatedByName', width: 25 },
      { header: 'Message', key: 'message', width: 40 },
      { header: 'Remark', key: 'remark', width: 40 }
    ]

    transactions.forEach((transaction) => {
      worksheet.addRow({
        _id: transaction._id.toString(),
        apiName: transaction.apiId?.name || 'N/A',
        status: transaction.status,
        transactionType: transaction.transactionType,
        price: transaction.price,
        httpStatus: transaction.httpStatus,
        requestedAt: transaction.requestedAt,
        completedAt: transaction.completedAt,
        initiatedByName: transaction.initiatedBy?.name || 'N/A',
        message: transaction.message || '',
        remark: transaction.remark || ''
      })
    })

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=transactions_${
        new Date().toISOString().split('T')[0]
      }.xlsx`
    )

    await workbook.xlsx.write(res)
    res.end()
  } catch (error) {
    console.error('Error exporting transactions:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to export transaction records'
    })
  }
}

module.exports = exportClientTransactions

const APITransaction = require('../../models/apiTransaction')
const API = require('../../models/api') // Add this import
const mongoose = require('mongoose')

/**
 * Get client transactions with pagination, sorting, and basic filtering
 * @route GET /clients/:clientId/transactions
 */
const getClientTransactions = async (req, res) => {
  try {
    const { bcaId: clientId } = req.user

    // Validate clientId
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid client ID format' })
    }

    // Get query parameters with defaults
    const {
      page = 1,
      limit = 10,
      status,
      transactionType,
      startDate,
      endDate,
      sort = '-requestedAt'
    } = req.query

    // Parse pagination parameters
    const parsedPage = Math.max(parseInt(page, 10) || 1, 1)
    const parsedLimit = Math.max(parseInt(limit, 10) || 10, 1)

    // Build filter query
    const query = { clientId: clientId }

    // Add status filter if provided
    if (status) {
      query.status = status
    }

    // Add transaction type filter if provided
    if (transactionType) {
      query.transactionType = transactionType
    }

    // Add date range filter if provided
    if (startDate || endDate) {
      query.requestedAt = {}

      if (startDate) {
        const start = new Date(startDate)
        if (!isNaN(start.getTime())) {
          query.requestedAt.$gte = start
        }
      }

      if (endDate) {
        const end = new Date(endDate)
        if (!isNaN(end.getTime())) {
          // Add one day to include the end date fully
          end.setHours(23, 59, 59, 999)
          query.requestedAt.$lte = end
        }
      }
    }

    // Parse sort parameter
    let sortOption = {}
    if (sort.startsWith('-')) {
      sortOption[sort.substring(1)] = -1
    } else {
      sortOption[sort] = 1
    }

    // Define fields to exclude from response
    const projection = {
      requestData: 0, // Exclude the requestData field
      responseData: 0
    }

    // Execute query with pagination
    const totalDocuments = await APITransaction.countDocuments(query)
    const skip = (parsedPage - 1) * parsedLimit

    // Execute the main query
    let transactions = await APITransaction.find(query, projection)
      .sort(sortOption)
      .skip(skip)
      .limit(parsedLimit)
      .populate([
        { path: 'apiId', select: 'name' } // Add this populate
      ])
      .lean()

    // Map through transactions to add apiName
    transactions = transactions.map((transaction) => {
      return {
        ...transaction,
        apiName: transaction.apiId?.name || null,
        apiId: transaction.apiId?._id || null
      }
    })

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalDocuments / parsedLimit)

    // Return paginated response
    return res.json({
      transactions,
      pagination: {
        totalDocs: totalDocuments,
        limit: parsedLimit,
        totalPages,
        page: parsedPage,
        hasPrevPage: parsedPage > 1,
        hasNextPage: parsedPage < totalPages,
        prevPage: parsedPage > 1 ? parsedPage - 1 : null,
        nextPage: parsedPage < totalPages ? parsedPage + 1 : null
      }
    })
  } catch (error) {
    console.error('Error fetching client transactions:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction records'
    })
  }
}

module.exports = getClientTransactions

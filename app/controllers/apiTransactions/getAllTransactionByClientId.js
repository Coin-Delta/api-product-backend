const APITransaction = require('../../models/apiTransaction')

// Get client transactions with pagination and filtering
const getClientTransactions = async (req, res) => {
  try {
    const { clientId } = req.params
    const {
      page = 1,
      limit = 10,
      status,
      transactionType,
      startDate,
      endDate,
      sort = '-createdAt'
    } = req.query

    // Build filter query
    const query = { clientId }

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
        query.requestedAt.$gte = new Date(startDate)
      }

      if (endDate) {
        // Add one day to include the end date fully
        const end = new Date(endDate)
        end.setDate(end.getDate() + 1)
        query.requestedAt.$lt = end
      }
    }

    // Set up pagination options
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      populate: [
        { path: 'initiatedBy', select: 'name email' },
        { path: 'initiatedByRoleId', select: 'name' }
      ],
      lean: true
    }

    // Execute paginated query
    const result = await APITransaction.paginate(query, options)

    res.json({
      transactions: result.docs,
      pagination: {
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page,
        pagingCounter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = getClientTransactions

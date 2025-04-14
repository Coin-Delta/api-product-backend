const APITransaction = require('../../models/apiTransaction')

const getDashboardAnalytics = async (req, res) => {
  try {
    let { period = 'last_12_months', from, to } = req.query
    let matchQuery = {}

    const currentDate = new Date()

    // Determine the date range based on the period or custom dates
    switch (period) {
      case 'last_12_months':
        const lastYearDate = new Date(currentDate)
        lastYearDate.setMonth(currentDate.getMonth() - 12)
        matchQuery.requestedAt = { $gte: lastYearDate, $lte: currentDate }
        break
      case 'this_month':
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        )
        const endOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        )
        matchQuery.requestedAt = { $gte: startOfMonth, $lte: endOfMonth }
        break
      case 'last_6_months':
        const lastSixMonthsDate = new Date(currentDate)
        lastSixMonthsDate.setMonth(currentDate.getMonth() - 6)
        matchQuery.requestedAt = { $gte: lastSixMonthsDate, $lte: currentDate }
        break
      case 'last_3_months':
        const lastThreeMonthsDate = new Date(currentDate)
        lastThreeMonthsDate.setMonth(currentDate.getMonth() - 3)
        matchQuery.requestedAt = {
          $gte: lastThreeMonthsDate,
          $lte: currentDate
        }
        break
      case 'this_year':
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1)
        matchQuery.requestedAt = { $gte: startOfYear, $lte: currentDate }
        break
      case 'last_week':
        const lastWeekDate = new Date(currentDate)
        lastWeekDate.setDate(currentDate.getDate() - 7)
        matchQuery.requestedAt = { $gte: lastWeekDate, $lte: currentDate }
        break
      case 'custom':
        if (from && to) {
          const fromDate = new Date(from)
          const toDate = new Date(to)
          matchQuery.requestedAt = { $gte: fromDate, $lte: toDate }
        } else {
          return res
            .status(400)
            .json({
              message:
                'Please provide both "from" and "to" dates for a custom period.'
            })
        }
        break
      default:
        return res.status(400).json({ message: 'Invalid period specified.' })
    }

    const pipeline = [
      // Stage 1: Filter transactions based on the date range
      { $match: matchQuery },
      // Stage 2: Group transactions by API ID, year, and month to count API calls
      {
        $group: {
          _id: {
            apiId: '$apiId',
            year: { $year: '$requestedAt' },
            month: { $month: '$requestedAt' }
          },
          count: { $sum: 1 }
        }
      },

      // Stage 3: Retrieve API details (specifically the name) using a lookup
      {
        $lookup: {
          from: 'apis',
          localField: '_id.apiId',
          foreignField: '_id',
          as: 'apiDetails'
        }
      },
      // Stage 4: Unwind the API details array (since lookup returns an array)
      {
        $unwind: {
          path: '$apiDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      // Stage 5: Project the required fields to shape the output
      {
        $project: {
          _id: 0,
          apiId: '$_id.apiId',
          apiName: '$apiDetails.name',
          year: '$_id.year',
          month: '$_id.month',
          count: 1
        }
      },
      // Stage 6: Sort the results by API ID, year, and month for better readability
      {
        $sort: {
          apiId: 1,
          year: 1,
          month: 1
        }
      }
    ]

    const analyticsData = await APITransaction.aggregate(pipeline)
    const finalResult = {}

    // Restructure the aggregated data into a more usable format
    analyticsData.forEach((item) => {
      if (!finalResult[item.apiId]) {
        finalResult[item.apiId] = {
          apiId: item.apiId,
          apiName: item.apiName,
          yearlyData: {}
        }
      }
      if (!finalResult[item.apiId].yearlyData[item.year]) {
        finalResult[item.apiId].yearlyData[item.year] = {}
      }

      finalResult[item.apiId].yearlyData[item.year][item.month] = item.count
    })

    // Respond with the transformed data
    res.status(200).json(Object.values(finalResult))
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = { getDashboardAnalytics }

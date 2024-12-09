/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} query - query object
 */
const aggregatepaginate = async (
  condition = [],
  query = {},
  model = {},
  response = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const paginationQuery = []
      let totalDocs = await model.aggregate([
        ...condition,
        { $count: 'count' },
        { $project: { count: 1 } }
      ])
      totalDocs =
        totalDocs && totalDocs.length && totalDocs[0] && totalDocs[0].count
          ? totalDocs[0].count
          : 0
      if (query.sort && query.order) {
        paginationQuery.push({ $sort: { [query.sort]: +[query.order] } })
      }
      if (!isNaN(query.page) && !isNaN(query.limit)) {
        paginationQuery.push({ $skip: (+query.page - 1) * +query.limit })
        paginationQuery.push({ $limit: +query.limit })
        const totalPages = Math.floor(totalDocs / query.limit) + 1
        response = {
          totalDocs,
          totalPages,
          page: +query?.page,
          limit: +query?.limit,
          pagingCounter: +query?.page,
          hasPrevPage: +query?.page - 1 > 0,
          hasNextPage: totalPages >= +query?.page + 1,
          prevPage: +query?.page - 1 > 0 ? +query?.page - 1 : null,
          nextPage: totalPages >= +query?.page + 1 ? +query?.page + 1 : null
        }
      }
      resolve({ paginationQuery, response })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = { aggregatepaginate }

const { buildErrObject } = require('../../middleware/utils')
const { buildSort } = require('./buildSort')

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = (req = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = req.query.order || -1
      const sort = req.query.sort || 'createdAt'
      const sortBy = buildSort(sort, order)
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 10
      let populateFields = req?.query?.populate
      const populateArray = []
      populateFields = populateFields?.split(',')
      if (populateFields?.length) {
        for (let p = 0; p < populateFields?.length; p++) {
          populateArray.push({
            path: populateFields[p],
            select: req?.query?.selectPopulate
              ? req?.query?.selectPopulate.split(',')
              : []
          })
        }
      }
      const options = {
        sort: sortBy,
        lean: true,
        page,
        limit,
        populate: populateArray
      }
      resolve(options)
    } catch (error) {
      reject(buildErrObject(422, error?.message))
    }
  })
}

module.exports = { listInitOptions }

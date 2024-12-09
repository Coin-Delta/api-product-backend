const { itemNotFound } = require('../../../middleware/utils')
/**
 *@param {Object} query - query object
 */
const getBCAFromDB = (query = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.find(query, async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      })
      .lean()
  })
}

module.exports = { getBCAFromDB }

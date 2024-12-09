const { itemNotFound } = require('../../../middleware/utils')
const user = require('../../../models/user')
/**
 *@param {Object} query - query object
 */
const getUserFromDB = (query = '', model = {}) => {
  return new Promise((resolve, reject) => {
    user
      .find(query, async (err, item) => {
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

module.exports = { getUserFromDB }

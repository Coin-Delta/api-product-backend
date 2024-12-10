const { itemNotFound } = require('../../../middleware/utils')
const user = require('../../../models/user')
/**
 *@param {Object} query - query object
 */
const updateBCAOtpCode = (id = '', model = {}, query = {}) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      id,
      query,
      {
        new: true,
        runValidators: true
      },
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { updateBCAOtpCode }

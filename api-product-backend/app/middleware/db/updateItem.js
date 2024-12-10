const { itemNotFound } = require('../../middleware/utils')

/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} req - request object
 */
const updateItem = (id = '', model = {}, req = {}, session = null) => {
  return new Promise((resolve, reject) => {
    if (session) {
      model.findByIdAndUpdate(
        id,
        req,
        {
          new: true,
          runValidators: true,
          session
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
    } else {
      model.findByIdAndUpdate(
        id,
        req,
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
    }
  })
}

module.exports = { updateItem }

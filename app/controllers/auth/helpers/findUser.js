const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = (query = {} , model={}) => {
  return new Promise((resolve, reject) => {
    model.findOne(  
      query,
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findUser }

const { itemNotFound, buildErrObject } = require('../../../middleware/utils')
const BCA = require('../../../models/BCA')
const company = require('../../../models/company')
const user = require('../../../models/user')

/**
 
Checks against user if has quested role
@param {Object} data - data object
@param {*} next - next callback
*/

const checkPermissions = ({ id = '', roles = [] }, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Search in the User collection
      let result = await findByIdInCollection(id, user)
      if (!result) {
        // If not found in User collection, search in the BCA collection
        result = await findByIdInCollection(id, BCA)
      }
      if (!result) {
        // If not found in BCA collection, search in the Company collection
        result = await findByIdInCollection(id, company)
      }

      await itemNotFound(null, result, 'USER_NOT_FOUND')

      if (roles.indexOf(result.role) > -1) {
        resolve(next())
      }
      reject(buildErrObject(401, 'UNAUTHORIZED'))
    } catch (error) {
      reject(error)
    }
  })
}

const findByIdInCollection = async (id, collection) => {
  return new Promise((resolve, reject) => {
    collection.findById(id, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = { checkPermissions }

const mongoose = require('mongoose')

const aggregateCheckQueryParam = async (query = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const removeItems = [
        'page',
        'limit',
        'sort',
        'order',
        'populate',
        'selectPopulate'
      ]
      if (query && !query?.hasOwnProperty('page')) {
        query['page'] = 1
      }
      if (query && !query?.hasOwnProperty('limit')) {
        query['limit'] = 5
      }
      const queryParamas = Object.keys(query)
      const directQueryParams = queryParamas.filter((value) => {
        return !removeItems.includes(value)
      })
      const condition = []
      if (directQueryParams?.length) {
        for (let d = 0; d < directQueryParams.length; d++) {
          const key = directQueryParams[d]
          if (query[key] === 'false') {
            condition.push({
              $match: { $or: [{ [key]: false }, { [key]: { $exists: false } }] }
            })
          } else {
            condition.push({
              $match: {
                [key]: mongoose.Types.ObjectId.isValid(query[key])
                  ? mongoose.Types.ObjectId(query[key])
                  : !isNaN(query[key])
                  ? +query[key]
                  : query[key] === 'true'
                  ? true
                  : query[key] === 'false'
                  ? false
                  : {
                      $regex: new RegExp(query[key], 'i')
                    }
              }
            })
          }
        }
      }
      resolve(condition)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = { aggregateCheckQueryParam }

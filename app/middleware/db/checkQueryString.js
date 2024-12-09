/* eslint no-nested-ternary: "off"*/
const { buildErrObject } = require('../../middleware/utils')
const mongoose = require('mongoose')
/**
 * Checks the query string for filtering records
 * query.filter should be the text to search (string)
 * query.fields should be the fields to search into (array)
 * @param {Object} query - query object
 */
const checkQueryString = (query = {}) => {
  // eslint-disable-next-line max-statements
  return new Promise((resolve, reject) => {
    try {
      const data = {
        $and: []
      }
      const andArray = []
      const removeItems = [
        'page',
        'limit',
        'sort',
        'order',
        'populate',
        'selectPopulate',
        'filter',
        'fields'
      ]
      const queryParamas = Object.keys(query)
      const directQueryParams = queryParamas.filter((value) => {
        return !removeItems.includes(value)
      })
      if (
        typeof query.filter !== 'undefined' &&
        typeof query.fields !== 'undefined'
      ) {
        // Takes fields param and builds an array by splitting with ','
        const arrayFields = query.fields.split(',')
        // Adds SQL Like %word% with regex
        const arrayFilters = query.filter.split(',')
        arrayFilters.map((value) => {
          const array = []
          arrayFields.map((item) => {
            array.push({
              [item]:
                value === 'true' || value === 'false'
                  ? value
                  : mongoose.Types.ObjectId.isValid(value) || !isNaN(value)
                  ? value
                  : {
                      $regex: new RegExp(value, 'i')
                    }
            })
          })
          andArray.push({ $or: array })
        })
      }
      if (directQueryParams && directQueryParams.length) {
        directQueryParams.map((item) => {
          if (item.split('__').length === 1) {
            if (query[item] === 'false') {
              andArray.push({
                $or: [{ [item]: false }, { [item]: { $exists: false } }]
              })
            } else {
              andArray.push({
                [item]:
                  query[item] === 'true'
                    ? query[item]
                    : mongoose.Types.ObjectId.isValid(query[item]) ||
                      !isNaN(query[item])
                    ? query[item]
                    : {
                        $regex: new RegExp(query[item], 'i')
                      }
              })
            }
          } else {
            andArray.push({
              [item.split('__')[0]]: {
                [`$${[item.split('__')[1]]}`]: query[item]
              }
            })
          }
        })
      }
      if (andArray && andArray.length) {
        data.$and = andArray
        resolve(data)
      } else {
        resolve({})
      }
    } catch (err) {
      console.log(err.message)
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}

module.exports = { checkQueryString }

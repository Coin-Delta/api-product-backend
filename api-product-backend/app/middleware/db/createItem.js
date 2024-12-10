const { buildErrObject } = require('../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItem = (req = {}, model = {}, session = null) => {
  return new Promise((resolve, reject) => {
    if (session) {
      // console.log(req,"()()()((((()(())((");
      model.create(req, { session }, (err, item) => {
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        resolve(item)
      })
    } else {
      // console.log("req.body in create >>>>", req)
      
      model.create(req, (err, item) => {
        // console.log(err,"()()()((((()(())((",item);
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        resolve(item)
      })
    }
  })
}

module.exports = { createItem }

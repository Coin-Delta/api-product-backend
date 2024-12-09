const { validationResult } = require('express-validator')
const { handleError } = require('./handleError')
const { buildErrObject } = require('./buildErrObject')
const { decrypt } = require('../auth')

/**
 * Builds error for validation files
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next object
 */

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    if (req.body.email) {
      const email = decrypt(req.body.email)
      req.body.email =
        email && email?.length
          ? email.toLowerCase()
          : req.body.email.toLowerCase()
    }
    if (req?.body?.emails?.lenght) {
      req.body.emails.forEach((element) => {
        const email = decrypt(element)
        element =
          email && email?.length ? email.toLowerCase() : element.toLowerCase()
      })
    }
    return next()
  } catch (err) {
    return handleError(res, buildErrObject(422, err.array()))
  }
}

module.exports = { validateResult }

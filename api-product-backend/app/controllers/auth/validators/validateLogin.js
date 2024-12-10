const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates login request
 */
const validateLogin = [
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .isString()
    .withMessage('IS_EMPTY')
    .withMessage('email_IS_NOT_VALID'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]


module.exports = { validateLogin }
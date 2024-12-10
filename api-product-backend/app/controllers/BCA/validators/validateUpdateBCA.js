const { validateResult } = require('../../../middleware/utils')
const { param, check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateUpdateBCA = [
  param('id').isMongoId().withMessage('Invalid BCA ID'),
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('address')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  // check('companyRegistrationNumber')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY'),
  // check('websiteLink')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY'),
  // check('userWallet')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY'),
  // check('supportingDocuments')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isArray()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY'),
  // check('logoURL')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY'),
  // check('status')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateBCA }

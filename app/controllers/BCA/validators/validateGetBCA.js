const { query, validationResult } = require('express-validator')

const validateGetBCA = [
  query('page').optional().isInt({ min: 1 }).withMessage('Invalid page number'),
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Invalid limit value'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {validateGetBCA}

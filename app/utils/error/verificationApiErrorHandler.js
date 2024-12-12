// src/middleware/errorHandler.js

const { STATUS_CODES } = require('../../constant/statusCode')
const WalletError = require('./walletError')

const errorHandler = (err, req, res) => {
  if (err instanceof WalletError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return res.status(STATUS_CODES.SERVER_ERROR).json({
    status: 'error',
    message: 'An unexpected error occurred'
  })
}

module.exports = errorHandler

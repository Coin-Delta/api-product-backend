const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const { verifyJWT } = require('../middleware/auth')
const {
  getClientTransactions,
  getClientTransactionInExcel
} = require('../controllers/apiTransactionLogs')

/*
 * API Product route
 */

router.get('/logs', trimRequest.all, verifyJWT, getClientTransactions)
router.get(
  '/logs/export',
  trimRequest.all,
  verifyJWT,
  getClientTransactionInExcel
)

module.exports = router

const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const { verifyJWT } = require('../middleware/auth')
const { getClientTransactions } = require('../controllers/apiTransactionLogs')

/*
 * API Product route
 */

router.get('/logs', trimRequest.all, verifyJWT, getClientTransactions)

module.exports = router

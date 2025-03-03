const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const { verifyJWT } = require('../middleware/auth')
const { getClientTransactions } = require('../controllers/apiTransactions')

/*
 * API Product route
 */

router.get('/:clientId/logs', trimRequest.all, verifyJWT, getClientTransactions)

module.exports = router

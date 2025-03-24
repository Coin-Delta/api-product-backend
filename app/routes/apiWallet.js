const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const { verifyJWT } = require('../middleware/auth')
const {
  getClientWallet,
  updateApiWalletBalance
} = require('../controllers/apiWallet')

/*
 * API Product route
 */

router.get('/balance', trimRequest.all, verifyJWT, getClientWallet)
router.post('/add-balance', trimRequest.all, verifyJWT, updateApiWalletBalance)

module.exports = router

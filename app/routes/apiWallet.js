const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const { verifyJWT } = require('../middleware/auth')
const {
  getClientApiWalletConfig,
  updateClientApiConfig,
  updateClientWalletBalance
} = require('../controllers/apiWallet')

/*
 * API Product route
 */

router.get(
  '/config/:clientId',
  trimRequest.all,
  verifyJWT,
  getClientApiWalletConfig
)
router.put(
  '/:clientId/config',
  trimRequest.all,
  verifyJWT,
  updateClientApiConfig
)
router.put(
  '/:clientId/balance',
  trimRequest.all,
  verifyJWT,
  updateClientWalletBalance
)

module.exports = router

const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/auth/jwtAuth.js')
const APIWalletController = require('../controllers/apiWallet/apiWalletController.js')

// auth middleware before each route
router.use(verifyJWT)

// NOTE : clientid (bcaid) is passed in token and not in path_variable or query params
router.get('/', APIWalletController.getClientAPIWalletBalance)

module.exports = router

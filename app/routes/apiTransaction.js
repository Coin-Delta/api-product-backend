const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/auth/jwtAuth.js')
const APITransactionController = require('../controllers/apiTransaction/apiTransactionController.js')

// auth middleware before each route
router.use(verifyJWT)

// NOTE : clientid (bcaid) is passed in token and not in path_variable or query params
router.get('/', APITransactionController.getClientAPITransactions)

module.exports = router

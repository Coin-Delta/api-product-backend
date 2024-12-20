// routes/apiVendor.js
const express = require('express')
const router = express.Router()
const APIVendorController = require('../controllers/apiVendor/apiVendor.controller')
const verifyJWT = require('../middleware/auth/jwtAuth.js')

// auth middleware before each route
router.use(verifyJWT)

router.post('/', APIVendorController.create)
router.put('/:id', APIVendorController.update)
router.get('/', APIVendorController.getAll)
router.get('/:id', APIVendorController.getById)

module.exports = router

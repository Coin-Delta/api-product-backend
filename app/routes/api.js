const express = require('express')
const router = express.Router()
const APIController = require('../controllers/api/apiController')
const verifyJWT = require('../middleware/auth/jwtAuth.js')

// auth middleware before each route
router.use(verifyJWT)

router.post('/', APIController.create)
router.put('/:id', APIController.update)
router.get('/', APIController.getAll)
router.get('/:id', APIController.getById)
router.delete('/:id', APIController.delete)

module.exports = router

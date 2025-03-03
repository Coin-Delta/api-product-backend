const express = require('express')
const router = express.Router()
const APIController = require('../controllers/api/apiController')
const { verifyJWT } = require('../middleware/auth')
const trimRequest = require('trim-request')

router.post('/', APIController.create)
router.put('/:id', APIController.update)
router.get('/production', APIController.getAllActiveApis)
router.get('/', trimRequest.all, verifyJWT, APIController.getAllApis)
router.get('/:id', APIController.getById)
router.delete('/:id', APIController.delete)

module.exports = router

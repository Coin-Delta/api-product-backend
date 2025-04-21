const express = require('express')
const router = express.Router()
const APIController = require('../controllers/api/apiController')
const { verifyJWT } = require('../middleware/auth')

router.post('/', APIController.create)
router.put('/:id', APIController.update)
router.get('/', verifyJWT, APIController.getAllActiveApis)
router.get('/all', APIController.getAllApis)
router.get('/:id', APIController.getById)
router.delete('/:id', APIController.delete)

module.exports = router

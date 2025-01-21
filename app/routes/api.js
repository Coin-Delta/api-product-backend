const express = require('express')
const router = express.Router()
const APIController = require('../controllers/api/apiController')

router.post('/', APIController.create)
router.put('/:id', APIController.update)
router.get('/production', APIController.getAllActiveApis)
router.get('/', APIController.getAllApis)
router.get('/:id', APIController.getById)
router.delete('/:id', APIController.delete)

module.exports = router

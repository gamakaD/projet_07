const express = require('express')
const router = express.Router()

const adminCtrl = require('../controllers/admin')

const checkRole = require('../middleware/checkRole')

router.get('/', checkRole, adminCtrl.getAllUsers)

router.get('/user/:id', checkRole, adminCtrl.getUserPost)

router.delete('/user/:id', checkRole, adminCtrl.deleteUser)

module.exports = router
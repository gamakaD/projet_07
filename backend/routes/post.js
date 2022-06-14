const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer')

const postCtrl = require('../controllers/post')

router.get('/', postCtrl.getAllPost)

router.post('/', multer, postCtrl.createPost)

module.exports = router
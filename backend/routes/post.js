const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

const postCtrl = require('../controllers/post')

router.get('/', postCtrl.getAllPost)

router.get('/user', auth, postCtrl.getUserPost)

router.get('/:id', auth, postCtrl.getOnePost)

router.post('/', auth, multer, postCtrl.createPost)

router.put('/:id', auth, multer, postCtrl.updatePost)

router.delete('/:id', auth, postCtrl.deletePost)

router.post('/like/:id', postCtrl.likePost)

module.exports = router
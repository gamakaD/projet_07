const Post = require('../models/Post')
const fs = require('fs')

exports.getAllPost = (req, res, next) => {
    Post.find().sort({ createdAt: -1 })
        .then(post => res.status(200).json(post))
        .catch(err => res.status(400).json({ message: err }))
}

exports.getUserPost = (req, res, next) => {
    let userId = req.auth.userId
    let userPost = []
    Post.find().sort({ createdAt: -1 })
        .then(post => {
            post.forEach(element => {
                if (element.userId === userId) {
                    userPost.push(element)
                }
            });
            res.status(200).json(userPost)
        })
        .catch(err => res.status(400).json({ message: err }))
}

exports.getOnePost = (req, res, next) => {
    Post.findById({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(err => res.status(400).json({ message: err }))
}

exports.createPost = (req, res, next) => {
    let userId = req.auth.userId
    let post
    if (!req.file) {
        post = new Post({
            userId,
            ...req.body
        })
    } else {
        post = new Post({
            userId,
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
    }
    post.save()
        .then(() => res.status(201).json({ message: 'New post created !' }))
        .catch(err => res.status(400).json({ message: err }))
}

exports.updatePost = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found !' })
            }
            if (post.userId !== req.auth.userId) {
                return res.status(403).json({ error: new Error('Unauthorized request !') })
            }
            if (post.imageUrl && req.file) {
                const filename = post.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => console.log('file delected successfuly'))
            }
            const postObject = req.file ?
                {
                    ...req.body,
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : { ...req.body }
            Post.findByIdAndUpdate(req.params.id, { ...postObject })
                .then(() => res.status(200).json({ message: 'Post update successfuly!' }))
                .catch(err => res.status(400).json({ message: err }))
        })
        .catch(err => res.status(500).json({ message: err }))
}

exports.deletePost = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found !' })
            }
            function findDelete() {
                Post.findByIdAndDelete(req.params.id)
                    .then(() => res.status(200).json({ message: 'Post deleted successfuly !' }))
                    .catch(error => res.status(400).json({ message: error }))
            }
            if (post.userId === req.auth.userId || req.headers.role === 'admin') {
                if (post.imageUrl) {
                    const filename = post.imageUrl.split('/images/')[1]
                    fs.unlink(`images/${filename}`, findDelete)
                } else {
                    findDelete()
                }
            } else {
                return res.status(403).json({ error: new Error('Unauthorized request !') })
            }
        })
        .catch(error => res.status(500).json({ message: error }))
}

exports.likePost = (req, res, next) => {
    let user = req.body.user
    let like = req.body.like
    Post.findById(req.params.id)
        .then(post => {
            if (like === 1) {
                if (post.usersDisliked.includes(user)) {
                    post.dislikes--
                    post.usersDisliked.splice(post.usersDisliked.indexOf(user), 1)
                }
                post.likes++
                post.usersLiked.push(user)
            }
            if (like === -1) {
                if (post.usersLiked.includes(user)) {
                    post.likes--
                    post.usersLiked.splice(post.usersLiked.indexOf(user), 1)
                }
                post.dislikes++
                post.usersDisliked.push(user)
            }
            if (like === 0) {
                if (post.usersLiked.includes(user)) {
                    post.likes--
                    post.usersLiked.splice(post.usersLiked.indexOf(user), 1)
                } else {
                    post.dislikes--
                    post.usersDisliked.splice(post.usersDisliked.indexOf(user), 1)
                }
            }
            post.save()
                .then(() => res.status(200).json({ message: 'Ok like/dislike' }))
                .catch(err => res.status(400).json({ message: err }))
        })
        .catch(err => res.status(500).json({ message: err }))
}
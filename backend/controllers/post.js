const Post = require('../models/Post')
const fs = require('fs')

exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(400).json({ message: err }))
}

exports.createPost = (req, res, next) => {
    console.log(req.file)
    delete req.body._id
    if (!req.file) {
        const post = new Post({
            ...req.body
        })
        post.save()
            .then(() => res.status(201).json({ message: 'New post created !' }))
            .catch(err => res.status(400).json({ message: err }))
    } else {
        const post = new Post({
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        post.save()
            .then(() => res.status(201).json({ message: 'New post created !' }))
            .catch(err => res.status(400).json({ message: err }))
    }

}
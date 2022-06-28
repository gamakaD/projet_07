const User = require('../models/User')
const Post = require('../models/Post')

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({ messge: err }))
}

exports.getUserPost = (req, res, next) => {
    let userId = req.params.id
    let userPost = []
    Post.find()
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

exports.deleteUser = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found !' })
            }
            User.findByIdAndDelete(req.params.id)
                .then(() => res.status(200).json({ message: 'User deleted successfuly !' }))
                .catch(err => res.status(400).json({ message: err }))
        })
        .catch(err => res.status(500).json({ message: err }))
}
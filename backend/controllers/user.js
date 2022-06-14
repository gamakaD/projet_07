const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: 'User created successfuly !' }))
                .catch(error => res.status(400).json({ message: error }))
        })
        .catch(error => res.status(500).json({ message: error }))
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'User not found !' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Password don\'t match' })
                    }
                    res.status(201).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'GROUPOMANIA_SECRET_TOKEN',
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ message: error }))
        })
        .catch(error => res.status(500).json({ message: error }))
}

exports.getUser = (req, res) => {
    const token = req.params.id
    const decodedToken = jwt.verify(token, 'GROUPOMANIA_SECRET_TOKEN')
    const userId = decodedToken.userId
        User.findOne({ _id: userId })
            .then(user => res.status(200).json(user.email))
            .catch(err => res.status(400).json({ message: err }))
}
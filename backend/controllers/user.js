const User = require('../models/User')

exports.register = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save()
        .then(() => res.status(201).json({ message: 'User created successfuly !' }))
        .catch(error => res.status(400).json({ message: error }))
}
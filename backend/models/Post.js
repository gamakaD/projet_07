const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    // userId: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    usersLiked: { type: Array, required: true, default: [] },
    usersDisliked: { type: Array, required: true, default: [] }
})

module.exports = mongoose.model('Post', postSchema)
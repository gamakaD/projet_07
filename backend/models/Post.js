const mongoose = require('mongoose')
const mongooseDate = require('mongoose-date-format')

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    author: {type: String, required: true},
    message: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now() },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    usersLiked: { type: Array, required: true, default: [] },
    usersDisliked: { type: Array, required: true, default: [] }
})

postSchema.plugin(mongooseDate)

module.exports = mongoose.model('Post', postSchema)
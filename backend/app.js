const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const adminRoutes = require('./routes/admin')

const app = express()

mongoose.connect('mongodb://localhost/Groupomania', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Mongodb connection successful !'))
    .catch(() => console.log('Mongodb failed connection !'))

app.use(cors())
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/admin', adminRoutes)


module.exports = app
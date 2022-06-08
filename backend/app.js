const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')

const app = express()

mongoose.connect('mongodb://localhost/Groupomania', { useNewUrlParser: true,
useUnifiedTopology: true })
    .then(() => console.log('Mongodb connection successful !')) 
    .catch(() => console.log('Mongodb failed connection !'))

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)

module.exports = app
const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    email: String,
    password: String
})

const auth = mongoose.model('auth', authSchema)

module.exports = auth
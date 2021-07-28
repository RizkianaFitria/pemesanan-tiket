const mongoose = require('mongoose')

const packageOrderSchema = new mongoose.Schema({
    city: String,
    destination: String,
    departs: Date,
    returnDate: Date,
    room: String,
    adult: String,
    children: String
})

const packageOrder = mongoose.model('package', packageOrderSchema)

module.exports = packageOrder
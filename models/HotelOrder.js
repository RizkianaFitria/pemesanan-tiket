const mongoose = require('mongoose')

const hotelOrderSchema = new mongoose.Schema({
    city: String,
    returnDate: Date,
    checkout: Date,
    room: String,
    adult: String,
    children: String
})

const hotel = mongoose.model('hotel', hotelOrderSchema)

module.exports = hotel
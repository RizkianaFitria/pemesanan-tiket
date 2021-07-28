const mongoose = require('mongoose')

const flightOrderSchema = new mongoose.Schema({
    from_place: String,
    to_place: String,
    checkin: Date,
    checkout: Date,
    flight_class: String,
    adult: String,
    children: String
})

const flight = mongoose.model('flight', flightOrderSchema)

module.exports = flight
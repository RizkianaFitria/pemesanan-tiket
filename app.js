const express = require('express')
const app = express()
const port = 3000

const expressLayout = require('express-ejs-layouts')

require('./utils/db')
const auth = require('./models/Auth')
const flight = require('./models/FlightOrder')
const hotel = require('./models/HotelOrder')
const package = require('./models/PackageOrder')

app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', { layout: false })
})

app.get('/order', (req, res) => {
    res.render('order', { layout: false })
})

app.get('/about', (req, res) => {
    res.render('about', { layout: false })
})

app.get('/login', (req, res) => {
    res.render('login', { layout: false })
})

app.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const getUser = await auth.findOne({ email: email })

    if (!getUser) {
        res.redirect('/login')
    } else {
        if (password == getUser.password) {
            // req.session.hasLogin = true
            res.redirect('/')
        }
        else {
            // req.flash('msg', 'Wrong password!')
            res.redirect('/login')
        }
    }

})

app.post('/signup', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const confirm_password = req.body.confirm_password

    if (confirm_password !== password) {
        res.redirect('/login')
    } else {
        const newUser = new auth({
            email, password
        })
        newUser.save().then(() => { res.redirect('/login') })
    }
})


app.post('/flight', (req, res) => {
    const from_place = req.body.from_place
    const to_place = req.body.to_place
    const checkin = req.body.checkin
    const checkout = req.body.checkout
    const flight_class = req.body.flight_class
    const adult = req.body.adult
    const children = req.body.children

    const newFlight = new flight({
        from_place, to_place, checkin, checkout, flight_class, adult, children
    })

    newFlight.save().then(() => res.redirect('/order'))
})

app.post('/hotel', (req, res) => {
    const city = req.body.city
    const returnDate = req.body.return
    const checkout = req.body.checkout
    const room = req.body.room
    const adult = req.body.adult
    const children = req.body.children

    const newHotel = new hotel({
        city, returnDate, checkout, room, adult, children
    })

    newHotel.save().then(() => res.redirect('/order'))
})

app.post('/packages', (req, res) => {
    const city = req.body.city
    const destination = req.body.destination
    const departs = req.body.departs
    const returnDate = req.body.returnDate
    const room = req.body.room
    const adult = req.body.adult
    const children = req.body.children

    const newPackage = new package({
        city, destination, departs, returnDate, room, adult, children
    })

    newPackage.save().then(() => res.redirect('/order'))
})


app.listen(port, () => {
    console.log(`Server is Running at http://localhost:${port}`)
})
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const router1 = require('./routes/home_route')
const adminRoutes = require('./routes/adminRoutes')
const { searchRecord } = require('./config/connection')
const session = require('express-session')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

const viewPath = path.join(__dirname, 'views')
const staticPath = path.join(__dirname, 'public')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({ secret: process.env.SECURITY_KEY, resave: false, saveUninitialized: true }))

app.set('view engine', 'ejs')
app.set('views', viewPath)

app.use('/public', express.static(staticPath))

app.use(router1)
app.use('/admin', adminRoutes)

// searchRecord((err, result) => {
//     if (err) {
//         return console.log(err)
//     }
//     return console.log(result)
// })

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}/`)
})
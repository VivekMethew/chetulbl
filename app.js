require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const router1 = require('./routes/home_route')
const { searchRecord } = require('./config/connection')

console.log(process.env.DBPORT)

const viewPath = path.join(__dirname, 'views')
const staticPath = path.join(__dirname, 'public')
console.log(viewPath)

app.set('view engine', 'ejs')
app.set('views', viewPath)

app.use('/public', express.static(staticPath))

app.use(router1)

searchRecord((err, result) => {
    if (err) {
        return console.log(err)
    }
    return console.log(result)
})

app.listen(3000, () => {
    console.log('server running on ', 3000)
})
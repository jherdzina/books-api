const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()
const PORT = process.env.PORT
const app = express()

mongoose.connect(process.env.MONGO_URI, {useNewParser: true, useUnifiedTopology: true},
    () => { console.log('connected to mongo: ', process.env.MONGO_URI)}
)

app.use(express.urlencoded({  extended: true }))
app.use(express.json())

const booksController = require('./controllers/book_routes')
app.use('/books', booksController)

app.get('/', (req, res) => {
    console.log('Howdy Partner!')
    res.send('Welcome to the Books API!')
})

// LISTEN
app.listen(PORT, () => {
    console.log('Greetings! From port: ', PORT);
  })
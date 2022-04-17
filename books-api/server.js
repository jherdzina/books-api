const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()
const PORT = process.env.PORT
const app = express()

//cors implementation
var cors = require('cors')
 
app.use(cors())
 
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => console.log("Connected to Mongo: ", process.env.MONGO_URI));

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
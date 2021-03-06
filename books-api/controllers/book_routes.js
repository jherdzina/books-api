const express = require('express')
const books = express.Router()
const Book = require('../models/books')

books.get('/seed', (req, res) => {
  console.log('book model', Book)
  Book.insertMany([
    {
      "title": "The Shinobi Initiative",
      "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
      "year": 2014,
      "quantity": 10,
      "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
    {
      "title": "Tess the Wonder Dog",
      "description": "The tale of a dog who gets super powers",
      "year": 2007,
      "quantity": 3,
      "imageURL": "https://imgur.com/cEJmGKV.jpg"
    },
    {
      "title": "The Annals of Arathrae",
      "description": "This anthology tells the intertwined narratives of six fairy tales.",
      "year": 2016,
      "quantity": 8,
      "imageURL": "https://imgur.com/VGyUtrr.jpeg"
    },
    {
      "title": "W∀RP",
      "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
      "year": 2010,
      "quantity": 4,
      "imageURL": "https://imgur.com/qYLKtPH.jpeg"
    }
  ])
    .then(() => {
      return res.status(200).json({
        message: 'Seed successful'
  })
    })
    .catch((err) => {
      return res.status(400).json({
        message: 'Seed unsuccessful'
    })
    })
})

books.get('/:id', (req, res) => {
  Book.findById(req.params.id)
  .then(foundBook => {
    res.json(foundBook)
  })
  .catch(err => {
    res.json([])
  })
})

books.get('/', (req, res) => {
  console.log("Book")
  Book.find().then(foundBooks => {
    console.log("Books", foundBooks)
    res.json(foundBooks)
  }).catch(err => {
    res.json("Error", err)
  })

})

books.post('/', (req, res) => {
  Book.create(req.body)
  .then(createdBook => {
    res.json(createdBook)
  })
  .catch(err => {
    res.json("Error")
  })
})

  books.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
      .then(updatedBook => {
        res.json(updatedBook)
      })
      .catch(err => {
        res.json("Error")
      })
    })
  
  books.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id) 
    .then(deletedBook => { 
      res.json(deletedBook)
    })
    .catch(err => {
      res.json("Error")
    })
  })
  
  module.exports = books
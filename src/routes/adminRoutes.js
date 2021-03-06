// Insert bunch of record books
const express = require('express');
// const mongoClient = require('mongodb').MongoClient; Same as below Destructing
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
  {
    title: 'Of Mice and Men',
    genre: 'Fiction',
    author: 'John Steinbeck',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41uqpdzU9hL._SX281_BO1,204,203,200_.jpg'
  },
  {
    title: 'Foundation',
    genre: 'Science Fiction',
    author: 'Issac Asimov',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51NWJN5KHNL.jpg',
  },
  {
    title: 'Pride and Prejudice',
    genre: 'Romance',
    author: 'Jane Austen',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41i3FJ7C8HL._SX326_BO1,204,203,200_.jpg'
  },
  {
    title: '2001: A Space Odyssey',
    genre: 'Science Fiction',
    author: 'Arthur C Clarke',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41GhEJhy9SL.jpg'
  },
  {
    title: 'IT',
    genre: 'Horror',
    author: 'Stephen King',
    image: 'https://images-na.ssl-images-amazon.com/images/I/418XRMEX2UL._SX320_BO1,204,203,200_.jpg'
  },
  {
    title: '2000 Leagues Under The Sea',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51-kS8eAoAL._SX331_BO1,204,203,200_.jpg'
  },
  {
    title: 'Metamorphosis',
    genre: 'Existensialism',
    author: 'Franz Kafka',
    image: 'https://images-na.ssl-images-amazon.com/images/I/414VQUJXMlL.jpg'
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51BZ%2BrA19zL._SX314_BO1,204,203,200_.jpg',
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51nLJ-LD1QL._SX321_BO1,204,203,200_.jpg'
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    image: 'https://images-na.ssl-images-amazon.com/images/I/61DX-ILrEcL.jpg'
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51e-WvhQwfL._SX312_BO1,204,203,200_.jpg'
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    image: 'https: //images-na.ssl-images-amazon.com/images/I/61dW4OnpyNL._AC_US218_.jpg',
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    image: 'https://images-na.ssl-images-amazon.com/images/I/511agHu3R7L._SX258_BO1,204,203,200_.jpg'
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    image: 'https://images-na.ssl-images-amazon.com/images/I/513J8qSMgyL._SX331_BO1,204,203,200_.jpg'
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51LzaY0Wb5L.jpg'
  }
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dBName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connecting correctly to server');

          const db = client.db(dBName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;

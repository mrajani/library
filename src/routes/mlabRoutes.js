const express = require('express');
// const mongoClient = require('mongodb').MongoClient; Same as below Destructing
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:mlabRoutes');

const mlabRouter = express.Router();

function router(nav) {
  mlabRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://iono:ionosol1!@ds111113.mlab.com:11113/library';
      const dBName = 'library';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connecting, BookListViewMlab');

          const db = client.db(dBName);

          const collection = await db.collection('books');
          const books = await collection.find().toArray();

          res.render(
            'bookListViewMlab',
            {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  mlabRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://iono:ionosol1!@ds111113.mlab.com:11113/library';
      const dBName = 'library';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connecting, Mlab Bookview');

          const db = client.db(dBName);

          const collection = await db.collection('books');

          const book = await collection.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  return mlabRouter;
}

module.exports = router;

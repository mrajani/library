const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const chalk = require('chalk');
const debug = require('debug')('app:authRoutes');


const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dBName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to Local Mongo');
          const db = client.db(dBName);
          const collection = db.collection('users');
          const user = { username, password };
          const result = await collection.insertOne(user);
          debug(`${chalk.red('Creating User')}`);
        } catch (err) {
          debug(err);
        }
      }());

      // create user
      req.login(req.body, () => {
        debug(`${chalk.green('Redirecting to auth/profile')}`);
        res.redirect('/auth/profile');
      });
    });
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;

}

module.exports = router;

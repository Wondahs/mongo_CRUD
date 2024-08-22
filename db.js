const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'bookstore';
let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    // console.log(mongoUrl)
    MongoClient.connect(mongoUrl)
      .then(client => {
        console.log('Connected to MongoDB');
        dbConnection = client.db(DB_NAME);
        return cb();
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        return cb(err);
      });
  },
  getDb: () => dbConnection
}

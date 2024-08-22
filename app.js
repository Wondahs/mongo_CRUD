const express = require('express');
require('dotenv').config()

const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'books';
const ITEMS_PER_PAGE = process.env.ITEMS_PER_PAGE || 20;

let db;
// DB connection
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('Listening at port 3000');
    });
    db = getDb();
  }
})


app.get(`/${COLLECTION_NAME}`, (req, res) => {
  const page = req.query.page || 0;
  const itemsPerPage = ITEMS_PER_PAGE || 20; // Feel free to modify 

  const books = [];

  db.collection(COLLECTION_NAME)
    .find()
    .sort() // You can also change sort filter to suit your needs
    .skip(page * itemsPerPage)
    .limit(itemsPerPage)
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch((err) => {
      res.status(500).json({ error: 'could not fetch books:' + err });
    });
});

app.get(`/${COLLECTION_NAME}/:id`, (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ' + COLLECTION_NAME + ' ID' });
  }

  db.collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) })
    .then(doc => {
      if (!doc) {
        return res.status(404).json({ error: COLLECTION_NAME +' not found' });
      }
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: 'could not fetch book:' + err });
    })
});

app.post(`/${COLLECTION_NAME}/`, (req, res) => {
  const book = req.body;

  db.collection(COLLECTION_NAME)
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
      console.log('Data added successfully')
    })
    .catch((err) => {
      res.status(500).json({ error: 'could not create book:' + err });
    });
});

app.delete(`/${COLLECTION_NAME}/:id`, (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ' + COLLECTION_NAME + ' ID' });
  }

  db.collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) })
    .then((result) => {
      console.log(COLLECTION_NAME, 'deleted successfully');
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: 'could not delete book:' + err });
      console.log(COLLECTION_NAME, 'cannot be deleted')
    });
});

app.patch(`/${COLLECTION_NAME}/:id`, (req, res) => {
  const updates = req.body;
  const id = req.params.id;

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ' + COLLECTION_NAME + ' ID' });
  }

  db.collection(COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, {$set: updates})
    .then(result => {
      res.status(200).json(result);
      console.log("Successfully updated", COLLECTION_NAME);
    })
    .catch(err => {
      res.status(500).json({error: 'could not update the document' + err});
      console.log("Could not update", COLLECTION_NAME);
    })
})

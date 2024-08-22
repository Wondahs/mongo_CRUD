const express = require('express');

const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
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


app.get('/books', (req, res) => {
  const page = req.query.page || 0;
  const booksPerPage = 2;

  const books = [];

  db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch((err) => {
      res.status(500).json({ error: 'could not fetch books:' + err });
    });
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  db.collection('books')
    .findOne({ _id: new ObjectId(id) })
    .then(doc => {
      if (!doc) {
        return res.status(404).json({ error: 'book not found' });
      }
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: 'could not fetch book:' + err });
    })
});

app.post('/books', (req, res) => {
  const book = req.body;

  db.collection('books')
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
      console.log('Book:', book.title, 'added successfully')
    })
    .catch((err) => {
      res.status(500).json({ error: 'could not create book:' + err });
    });
});

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  db.collection('books')
    .deleteOne({ _id: new ObjectId(id) })
    .then((result) => {
      console.log('Book deleted successfully');
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: 'could not delete book:' + err });
      console.log('Book cannot be deleted')
    });
});

app.patch('/books/:id', (req, res) => {
  const updates = req.body;
  const id = req.params.id;

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  db.collection('books')
    .updateOne({ _id: new ObjectId(id) }, {$set: updates})
    .then(result => {
      res.status(200).json(result);
      console.log("Successfully updated book");
    })
    .catch(err => {
      res.status(500).json({error: 'could not update the document' + err});
      console.log("Could not update book");
    })
})
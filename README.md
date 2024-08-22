# MongoDB CRUD API

This Node.js backend API uses MongoDB for managing a database and collection. It can be a collection of anything. For this exaple `bookstore` database and `books` collection is used . It supports CRUD (Create, Read, Update, Delete) operations and is designed to be easily customizable to suit your needs.

## Features

- **Create**: Add new books to the `books` collection.
- **Read**: Retrieve books from the `books` collection.
- **Update**: Modify existing books in the `books` collection.
- **Delete**: Remove books from the `books` collection.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **MongoDB Driver**: Library for interacting with MongoDB.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance running locally or remotely.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Wondahs/mongo_CRUD.git
   cd your-repository
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your MongoDB connection string, database name, collection name and items per page(for pagination):

     ```plaintext
     MONGO_URI=mongodb://localhost:27017
     DB_NAME=bookstore
     COLLECTION_NAME=books
     ITEMS_PER_PAGE=10
     ```

     Note that COLLECTION_NAME will be used as the endpoint. In this case, requests will be made to `/books/`

### Running the Application

1. Start the server:

   ```bash
   npm start
   ```

2. The API will be running at `http://localhost:3000` (or another port if specified in your configuration).

### API Endpoints

  Note that COLLECTION_NAME will be used as the endpoint. In this case, requests will be made to `/books/`

- **POST /books**: Create a new book.
- **GET /books**: Retrieve all books.
- **GET /books/:id**: Retrieve a specific book by ID.
- **PATCH /books/:id**: Update a book by ID.
- **DELETE /books/:id**: Delete a book by ID.

### Example Requests

- **Create Book**:

  ```bash
  curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title": "Example Book", "author": "Author Name", "year": 2024}'
  ```

- **Get Books**:

  ```bash
  curl http://localhost:3000/books
  ```

- **Update Book**:

  ```bash
  curl -X PATCH http://localhost:3000/books/123 -H "Content-Type: application/json" -d '{"title": "Updated Book", "author": "New Author", "year": 2025}'
  ```

- **Delete Book**:

  ```bash
  curl -X DELETE http://localhost:3000/books/123
  ```

### Customization

You are encouraged to edit the code to fit your preferred usage. Feel free to modify the database name, collection name, or any other functionality to meet your requirements.

### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

### Acknowledgements

- Node.js and Express.js for providing a powerful environment for backend development.
- MongoDB for its flexible NoSQL database capabilities.

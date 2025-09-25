const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Check this line carefully
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Fetch all books or add a new book
// @route   GET /api/books & POST /api/books
// @access  Public (GET), Admin (POST)
router.route('/').get(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
}).post(protect, admin, async (req, res) => {
  const { title, author, description, price, ISBN, genre } = req.body;
  const newBook = new Book({
    title,
    author,
    description,
    price,
    ISBN,
    genre
  });
  const createdBook = await newBook.save();
  res.status(201).json(createdBook);
});

// @desc    Fetch a single book, update a book, or delete a book
// @route   GET /api/books/:id, PUT /api/books/:id, DELETE /api/books/:id
// @access  Public (GET), Admin (PUT, DELETE)
router.route('/:id').get(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
}).put(protect, admin, async (req, res) => {
  const { title, author, description, price, ISBN, genre } = req.body;
  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.price = price || book.price;
    book.ISBN = ISBN || book.ISBN;
    book.genre = genre || book.genre;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
}).delete(protect, admin, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await book.deleteOne(); // Use deleteOne()
    res.json({ message: 'Book removed' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = router;

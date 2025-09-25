const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    genre: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    ISBN: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
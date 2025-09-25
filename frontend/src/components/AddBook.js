import React, { useState } from 'react';

const AddBook = () => {
  // State to hold the form data
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    ISBN: '',
    genre: '',
  });

  // State to manage the status of the form submission
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle changes to the form inputs
  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      // Clear the form and show a success message
      setBookData({
        title: '',
        author: '',
        price: '',
        description: '',
        ISBN: '',
        genre: '',
      });
      setSuccessMessage('Book added successfully!');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="add-book-container">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={bookData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" value={bookData.author} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" value={bookData.price} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={bookData.description} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label htmlFor="ISBN">ISBN</label>
          <input type="text" id="ISBN" name="ISBN" value={bookData.ISBN} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input type="text" id="genre" name="genre" value={bookData.genre} onChange={handleChange} required />
        </div>
        <button type="submit">Add Book</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddBook;

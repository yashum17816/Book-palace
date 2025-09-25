import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    ISBN: '',
    genre: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        setBookData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      navigate('/admin'); // Navigate back to the admin dashboard after a successful update
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="edit-book-container">
      <h1>Edit Book</h1>
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
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;

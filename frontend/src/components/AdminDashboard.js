import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // Re-fetch the books to update the list
      fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <Link to="/admin/add-book">
        <button>Add New Book</button>
      </Link>
      <h2>Manage Existing Books</h2>
      <div className="book-list">
        {books.map(book => (
          <div key={book._id} className="book-item">
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p>${book.price}</p>
            <div>
              <Link to={`/admin/edit-book/${book._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

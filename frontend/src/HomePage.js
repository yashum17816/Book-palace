import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'; // Assuming your CSS is in App.css

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/books');
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    
    fetchBooks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bookstore</h1>
        <div className="book-list">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="book-card">
                <Link to={`/book/${book._id}`}>
                  <h2>{book.title}</h2>
                </Link>
                <p>by {book.author}</p>
                <p>${book.price}</p>
              </div>
            ))
          ) : (
            <p>Loading books...</p>
          )}
        </div>
      </header>
    </div>
  );
};

export default HomePage;
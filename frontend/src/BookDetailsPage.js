import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CartContext from './context/cartContext'; // New import

const BookDetailsPage = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const { dispatch } = useContext(CartContext); // Use the context

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    
    fetchBook();
  }, [id]);

  const addToCartHandler = () => {
  dispatch({ type: 'ADD_TO_CART', payload: { ...book, qty: 1 } });
  alert('Book added to cart!');
};

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>ISBN:</strong> {book.ISBN}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
};

export default BookDetailsPage;
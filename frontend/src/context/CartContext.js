import React, { createContext, useState, useEffect } from 'react';

// Create a new context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  // Use a state to hold the cart items, initializing from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error('Failed to parse cart items from localStorage:', error);
      return [];
    }
  });

  // useEffect to update localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart items to localStorage:', error);
    }
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (book) => {
    setCartItems((prevItems) => {
      // Check if the book is already in the cart
      const existingItem = prevItems.find((item) => item._id === book._id);

      if (existingItem) {
        // If it exists, update the quantity
        return prevItems.map((item) =>
          item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If not, add the new book with a quantity of 1
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Provide the cart state and functions to the rest of the app
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

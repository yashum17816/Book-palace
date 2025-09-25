import React, { useContext } from 'react';
import CartContext from './context/cartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);
  const { cartItems } = state;
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.qty}</p>
              <button onClick={() => removeFromCartHandler(item._id)}>Remove</button>
            </div>
          ))}
          <h2>Subtotal: ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
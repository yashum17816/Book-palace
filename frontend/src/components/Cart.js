import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg py-12">Your cart is empty. Start shopping to add some books!</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-6 border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
                    <span className="text-gray-400 text-sm">Book Cover</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 italic">by {item.author}</p>
                    <p className="text-base text-gray-800 font-semibold mt-2">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="mt-2 text-red-500 hover:text-red-700 transition-colors duration-300 transform hover:scale-105"
                      aria-label="Remove item"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl border border-gray-200 sticky top-8 self-start">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-semibold">Shipping:</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-4 border-t-2 border-dashed border-gray-200">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="mt-6 w-full py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              Proceed to Checkout
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">Shipping and taxes calculated at checkout.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

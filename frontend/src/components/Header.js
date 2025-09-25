import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';


const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-[#131921] text-white p-2 md:p-4">
      <nav className="container mx-auto flex items-center justify-between flex-wrap gap-2">
        {/* Logo and Delivery */}
        <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl md:text-3xl font-bold">Bookstore</Link>
            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Delivery</span>
                <span className="font-bold">India</span>
            </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto md:mx-4">
            <div className="flex rounded-md overflow-hidden">
                <input 
                    type="text" 
                    placeholder="Search for books, authors..." 
                    className="w-full text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="bg-[#febd69] px-4 py-2 hover:bg-[#f3a847] transition-colors duration-200">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
            <span className="bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center -ml-1 mt-1">
              {totalItems}
            </span>
          </Link>
          {user ? (
            <div className="flex items-center space-x-2 text-sm md:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 hidden md:block"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <button onClick={handleLogout} className="text-white flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-sm md:text-base">
              <Link to="/login" className="flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></svg>
                <span className="hidden md:inline">Login</span>
              </Link>
              <Link to="/register" className="hidden md:inline-block hover:text-gray-300 transition-colors duration-200">
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

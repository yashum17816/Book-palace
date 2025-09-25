import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import BookList from './components/BookList';
import Book from './components/Book';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Login from './components/Login';
import Register from './components/Register';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/book/:id" element={<Book />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes wrapped with AdminRoute for protection */}
              <Route path="/admin" element={<AdminRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="add-book" element={<AddBook />} />
                <Route path="edit-book/:id" element={<EditBook />} />
              </Route>
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../context/CartContext';

const Book = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Use the useContext hook to get the addToCart function
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Create a function to handle the "Add to Cart" click
  const handleAddToCart = () => {
    if (book) {
      addToCart(book);
      // Show the notification for 3 seconds
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error: {error}</div>;
  if (!book) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Book not found.</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-lg p-6">
        <div className="md:w-1/3 flex justify-center items-center">
          <div className="bg-gray-200 w-full h-96 rounded-lg flex items-center justify-center text-gray-500 font-bold text-center p-4">
            Book Cover Placeholder
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-lg text-gray-600 mt-2">by {book.author}</p>
          <div className="flex items-center mt-4">
            <span className="text-3xl font-bold text-red-600">${book.price}</span>
            <span className="text-sm text-gray-500 ml-2"> (incl. taxes)</span>
          </div>
          <p className="text-gray-700 mt-6 leading-relaxed">{book.description}</p>
          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-gray-500"><strong>ISBN:</strong> {book.ISBN}</p>
            <p className="text-sm text-gray-500"><strong>Genre:</strong> {book.genre}</p>
          </div>
          <button 
            onClick={handleAddToCart} 
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-xl">
          Book added to cart!
        </div>
      )}
    </div>
  );
};

export default Book;

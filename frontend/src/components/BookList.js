import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchBooks();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Loading books...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Featured Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map(book => (
                    <div key={book._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="p-4 text-center">
                             <img src="https://placehold.co/200x300/a0a0a0/ffffff?text=Book+Cover" alt="Book Cover" class="mx-auto rounded-md shadow-md mb-4"/>
                            <Link to={`/book/${book._id}`}>
                                <h3 className="text-xl font-semibold text-gray-800 truncate">{book.title}</h3>
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">by {book.author}</p>
                            <p className="text-lg font-bold text-gray-900 mt-2">${book.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;

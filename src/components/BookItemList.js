import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../redux/booksThunks';
import BookItem from './BookItem';

function BookItemList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { books, loading, error, bookCount } = useSelector((state) => state.books);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); // Key to force re-render
  const scrollPosRef = useRef(0); // Ref to store scroll position

  // Fetch books when component mounts or when refreshKey changes
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch, refreshKey]);

  useEffect(() => {
        document.title = "Shelflyst - Saved collection";
}, []);

  // Update bookCount locally after fetch or deletion
  useEffect(() => {
    // This effect will handle any side effects related to `bookCount`
    // For example, you could set local state based on `bookCount` if needed
    // Currently, we assume that `bookCount` from Redux is sufficient
  }, [bookCount]);

  // Handle book removal and force re-render
  const handleRemoveClick = (bookId) => {
    dispatch(deleteBook(bookId)).then(() => {
      setRefreshKey((prevKey) => prevKey + 1); // Change key to trigger re-render
    });
  };

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container pt-5 mt-5">
        {filteredBooks.length === 0 ? (
          <div className="text-center">
            <h2>Empty list of books. Browse and add to your collection!</h2>
          </div>
        ) : (
          <div className="row">
            {filteredBooks.map((book) => (
              <div key={book._id} className="col-md-3 mb-4">
                <BookItem
                  title={book.volumeInfo.title}
                  authors={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                  publishedDate={book.volumeInfo.publishedDate}
                  thumbnail={book.volumeInfo.imageLinks?.thumbnail}
                  description={book.volumeInfo.description || 'No description available.'}
                  showAddButton={false}
                  onAddClick={() => {}}
                  isAdded={() => {}}
                  onRemoveClick={() => handleRemoveClick(book._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default BookItemList;

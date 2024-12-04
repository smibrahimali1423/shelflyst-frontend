import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../redux/booksThunks';
import { fetchSharedBooks, shareBookToCommunity } from '../redux/sharedBooksThunks';
import BookItem from './BookItem';
import Alert from './Alert';

function BookItemList() {
  const dispatch = useDispatch();

  // Accessing the books and sharedBooks state from Redux store
  const { books, loading, error } = useSelector((state) => state.books);
  const { sharedBooks, loading: loadingSharedBooks, error: sharedBooksError } = useSelector((state) => state.sharedBooks);

  const [refreshKey, setRefreshKey] = useState(0); // Key to force re-render
  const [alert, setAlert] = useState(null); // Alert state

  useEffect(() => {
    // Dispatch the fetchSharedBooks action when the component mounts
    dispatch(fetchSharedBooks());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Shelflyst - Saved collection";
  }, []);

  // Fetch books when component mounts or when refreshKey changes
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch, refreshKey]);

  const handleRemoveClick = (bookId) => {
    dispatch(deleteBook(bookId)).then(() => {
      setRefreshKey((prevKey) => prevKey + 1); // Change key to trigger re-render
    });
  };

  // Handle sharing a book
  const handleShareClick = async (book) => {
    const isAlreadyShared = sharedBooks.some((sharedBook) => sharedBook.id === book.id);
    if (isAlreadyShared) {
      setAlert({ type: 'warning', msg: 'This book has already been shared!' });
      setTimeout(() => setAlert(null), 3000); // Clear the alert after 3 seconds
      return;
    }

    const userName = sessionStorage.getItem('userName') || 'abcd'; // Default to 'abcd' if no userName found

    const bookData = {
      id: book.id,
      selfLink: book.selfLink,
      volumeInfo: {
        title: book.volumeInfo.title || 'No title available',
        authors: Array.isArray(book.volumeInfo.authors) && book.volumeInfo.authors.length > 0 
          ? book.volumeInfo.authors 
          : ['Not known'],
        publishedDate: book.volumeInfo.publishedDate || 'Unknown',
        description: book.volumeInfo.description || 'Not available',
        imageLinks: {
          thumbnail: book.volumeInfo.imageLinks?.thumbnail || '/images/placeholder1.png',
        },
        language: book.volumeInfo.language || 'Not known',
        pageCount: book.volumeInfo.pageCount || 0,
        publisher: book.volumeInfo.publisher || 'Not available',
        sharedByUser: userName || 'abcd',
        date: book.volumeInfo.date,
      },
    };
  
    console.log("Book data being shared:", bookData); // Debugging line
      try {
      await dispatch(shareBookToCommunity(bookData)); // Dispatch the action to share the book
      setAlert({ type: 'success', msg: 'Book shared successfully!' });
      setTimeout(() => setAlert(null), 3000); // Clear the alert after 3 seconds
    } catch (error) {
      setAlert({ type: 'danger', msg: 'Failed to share the book.' });
      setTimeout(() => setAlert(null), 3000); // Clear the alert after 3 seconds
    }
  };

  if (loading || loadingSharedBooks) {
    return <p>Loading...</p>;
  }

  if (error || sharedBooksError) {
    return <p>Error: {error || sharedBooksError}</p>;
  }

  return (
    <div className="container pt-5 mt-5">
      {alert && <Alert alert={alert} clearAlert={() => setAlert(null)} />} {/* Show alert */}

      {books.length === 0 ? (
        <div className="text-center">
          <h2>Empty list of books. Browse and add to your collection!</h2>
        </div>
      ) : (
        <div className="row">
          {books.map((book) => {
            const isAlreadyShared = sharedBooks.some((sharedBook) => sharedBook.id === book.id);

            return (
              <div key={book._id} className="col-md-3 mb-4">
                <BookItem
                  title={book.volumeInfo.title}
                  authors={Array.isArray(book.volumeInfo.authors) && book.volumeInfo.authors.length > 0
                    ? book.volumeInfo.authors.join(', ')
                    : 'Not available'}                  publishedDate={book.volumeInfo.publishedDate}
                  thumbnail={book.volumeInfo.imageLinks?.thumbnail}
                  description={book.volumeInfo.description || 'No description available.'}
                  showAddButton={false}
                  onAddClick={() => {}}
                  isAdded={() => {}}
                  onRemoveClick={() => handleRemoveClick(book._id)}
                  onShareClick={ () => handleShareClick(book)} // Pass share handler
                  isShared={isAlreadyShared} // Pass shared state
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookItemList;


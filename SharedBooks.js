import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSharedBooks } from '../redux/sharedBooksThunks'; // Import the thunk to fetch shared books
import { FaShareAlt } from 'react-icons/fa';  // Import the share icon
import { useNavigate } from 'react-router-dom';  // Import the navigate hook

function SharedBooks() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const { sharedBooks, sharedBookCount, loading, error } = useSelector((state) => state.sharedBooks); // Access sharedBooks from Redux state

    useEffect(() => {
        // Dispatch the action to fetch shared books when the component mounts
        dispatch(fetchSharedBooks());
    }, [dispatch]);

    // Format the book data
    const formattedSharedBooks = sharedBooks.map((book) => ({
        id: book.id,
        selfLink: book.selfLink,
        volumeInfo: {
            title: book.volumeInfo.title || 'No title available',
            authors: Array.isArray(book.volumeInfo.authors) && book.volumeInfo.authors.length > 0 
                ? book.volumeInfo.authors 
                : ['Not known'],
            publishedDate: book.volumeInfo.publishedDate || 'Unknown',
            description: book.volumeInfo.description || 'No description available',
            imageLinks: {
                thumbnail: book.volumeInfo.imageLinks?.thumbnail || '/images/placeholder1.png'
            },
            sharedByUser: book.volumeInfo.sharedByUser,
            date: book.volumeInfo.date,
    
        },
    }));

    // Function to handle card click and navigate to the book details page
    const handleBookClick = (book) => {
        navigate('/book-details', {
            state: {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                publishedDate: book.volumeInfo.publishedDate,
                description: book.volumeInfo.description,
                thumbnail: book.volumeInfo.imageLinks?.thumbnail,
                genres: book.volumeInfo.genres,
                language: book.volumeInfo.language,
                pageCount: book.volumeInfo.pageCount,
                ratings: book.volumeInfo.ratings
            }
        });
    };

    return (
        <div className="container pt-5 mt-5">
            <h2>Shared Books</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {sharedBookCount === 0 ? (
                <p>No books shared yet.</p>
            ) : (
                <div className="row">
                    {formattedSharedBooks.map((book, index) => (
                        <div key={index} className="col-md-3 mb-4" onClick={() => handleBookClick(book)}>
                            <div className="card mb-5 pt-2" style={{ width: '18rem', cursor: 'pointer', position: 'relative' }}>
                                <img
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    className="card-img-top d-block mx-auto"
                                    alt={book.volumeInfo.title}
                                    style={{ height: '310px', width: '80%' }}
                                />
                                <div className="card-body" style={{ height: 'auto', overflow: 'hidden' }}>
                                    <h5 className="card-title" style={{ fontSize: '1rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        {book.volumeInfo.title}
                                    </h5>
                                    <p className="card-text" style={{ fontSize: '0.9rem' }}>
                                        <strong>Author(s):</strong> {book.volumeInfo.authors.join(', ')}
                                    </p>
                                    <p className="card-text" style={{ fontSize: '0.9rem' }}>
                                        <strong>Published:</strong> {book.volumeInfo.publishedDate.toString()}
                                    </p>
                                    <p className="card-text" style={{ fontSize: '0.9rem' }}>
                                        <strong>Shared By:</strong> {book.volumeInfo.sharedByUser}
                                    </p>
                                    <p className="card-text" style={{ fontSize: '0.9rem' }}>
                                        <strong>Shared On:</strong> {book.volumeInfo.date}
                                    </p>
                                    <p className="card-text" style={{ fontSize: '0.9rem', height: 'auto', overflow: 'hidden', marginBottom: '0' }}>
                                        <strong>Description:</strong> {book.volumeInfo.description.slice(0, 100)}{book.volumeInfo.description.length > 150 ? '...' : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SharedBooks;

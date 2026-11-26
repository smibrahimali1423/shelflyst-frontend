import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSharedBooks, unshareBook } from '../redux/sharedBooksThunks';
import ConfirmationModal from './ConfirmationModal';
import Alert from './Alert';
import DotPulse from './DotPulse';

function SharedBooks() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sharedBooks, sharedBookCount, loading, error } = useSelector((state) => state.sharedBooks);
    const currentUser = useSelector((state) => state.auth.user);
    const currentUserId = currentUser?._id || sessionStorage.getItem('userId');

    const [bookToRemove, setBookToRemove] = useState(null); // shared book waiting for confirmation
    const [alert, setAlert] = useState(null);
    const clearAlert = useCallback(() => setAlert(null), []);

    useEffect(() => {
        document.title = 'Shelflyst - Shared books';
        dispatch(fetchSharedBooks());
    }, [dispatch]);

    const formattedSharedBooks = sharedBooks.map((book) => ({
        _id: book._id,
        id: book.id,
        ownerId: book.user,
        volumeInfo: {
            title: book.volumeInfo?.title || 'No title available',
            authors: Array.isArray(book.volumeInfo?.authors) && book.volumeInfo.authors.length > 0
                ? book.volumeInfo.authors
                : ['Not known'],
            publishedDate: book.volumeInfo?.publishedDate || 'Unknown',
            description: book.volumeInfo?.description || 'No description available',
            thumbnail: book.volumeInfo?.imageLinks?.thumbnail || '/images/placeholder1.png',
            sharedByUser: book.volumeInfo?.sharedByUser || 'Unknown',
            date: book.volumeInfo?.date,
        },
    }));

    const handleBookClick = (book) => {
        navigate('/book-details', {
            state: {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                publishedDate: book.volumeInfo.publishedDate,
                description: book.volumeInfo.description,
                thumbnail: book.volumeInfo.thumbnail,
            },
        });
    };

    const confirmRemove = async () => {
        const book = bookToRemove;
        setBookToRemove(null);
        try {
            await dispatch(unshareBook(book._id));
            setAlert({ type: 'success', msg: `"${book.volumeInfo.title}" is no longer shared.` });
        } catch (err) {
            setAlert({ type: 'danger', msg: err.message || 'Failed to remove the shared book.' });
        }
    };

    return (
        <div className="container page-container">
            {alert && <Alert alert={alert} clearAlert={clearAlert} />}

            <div className="page-header">
                <h2 className="page-title">Shared Books</h2>
                {sharedBookCount > 0 && (
                    <span className="text-muted small">{sharedBookCount} shared by the community</span>
                )}
            </div>

            {loading && <DotPulse />}
            {error && <p className="text-danger">Error: {error}</p>}

            {!loading && sharedBookCount === 0 ? (
                <div className="empty-state">
                    <h4>No books shared yet</h4>
                    <p className="text-muted mb-0">Share a book from your shelf with the share icon on its card.</p>
                </div>
            ) : (
                <div className="book-grid">
                    {formattedSharedBooks.map((book) => {
                        const isMine = !!currentUserId && String(book.ownerId) === String(currentUserId);
                        const description = book.volumeInfo.description;
                        return (
                            <div key={book._id || book.id} className="card book-card h-100" onClick={() => handleBookClick(book)}>
                                <div className="book-cover-wrap">
                                    <img src={book.volumeInfo.thumbnail} className="book-cover" alt={book.volumeInfo.title} loading="lazy" />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title book-title" title={book.volumeInfo.title}>{book.volumeInfo.title}</h5>
                                    <p className="book-meta mb-1"><strong>Author(s):</strong> {book.volumeInfo.authors.join(', ')}</p>
                                    <p className="book-meta mb-1"><strong>Published:</strong> {String(book.volumeInfo.publishedDate)}</p>
                                    <p className="book-meta mb-1">
                                        <strong>Shared by:</strong> {isMine ? 'You' : book.volumeInfo.sharedByUser}
                                    </p>
                                    {book.volumeInfo.date && (
                                        <p className="book-meta mb-2"><strong>Shared on:</strong> {book.volumeInfo.date}</p>
                                    )}
                                    <p className="book-description mb-0">
                                        {description.length > 110 ? description.slice(0, 110) + '...' : description}
                                    </p>
                                </div>
                                {isMine && (
                                    <div className="card-footer book-card-footer">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm w-100"
                                            onClick={(e) => {
                                                e.stopPropagation(); // don't open the details page
                                                setBookToRemove(book);
                                            }}
                                        >
                                            <i className="fas fa-times-circle me-1"></i> Remove from shared
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <ConfirmationModal
                show={!!bookToRemove}
                message={bookToRemove ? `Stop sharing "${bookToRemove.volumeInfo.title}"? It stays on your own shelf.` : ''}
                onConfirm={confirmRemove}
                onCancel={() => setBookToRemove(null)}
            />
        </div>
    );
}

export default SharedBooks;

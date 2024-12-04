import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../redux/booksThunks';
import { searchStart, searchSuccess, searchFailure } from '../redux/searchSlice';
import BookItem from './BookItem';
import SearchBar from './SearchBar';
import Alert from './Alert';
import DotPulse from './DotPulse';

function BookSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Track the page number
    const dispatch = useDispatch();
    const { searchResults: books, loading, error } = useSelector((state) => state.search);
    const addedBooks = useSelector((state) => state.books.books); // List of already added books
    const [alert, setAlert] = useState(null); // Alert state
    const [isFetchingMore, setIsFetchingMore] = useState(false); // State to track if more results are being fetched
    const observer = useRef(); // Reference to the intersection observer

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

const fetchBooks = async (newPage = 0) => {
    if (!searchTerm.trim()) return;

    if (newPage === 0) {
        dispatch(searchStart());
    } else {
        setIsFetchingMore(true);
    }

    try {
        const maxResults = 40; // Fetch 40 results at a time
        const startIndex = newPage * maxResults; // Calculate the start index based on the page number
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const newBooks = newPage === 0 ? data.items || [] : [...books, ...(data.items || [])];
        
        dispatch(searchSuccess(newBooks)); // Update the state with the new books
    } catch (err) {
        dispatch(searchFailure('Failed to fetch books'));
    } finally {
        setIsFetchingMore(false);
    }
};

const handleSearch = () => {
    setPage(0); // Reset to page 0 on new search
    dispatch(searchSuccess([])); // Clear previous results
    fetchBooks(0); // Fetch first set of results
};

    const handleAddClick = (book) => {
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
                    thumbnail: book.volumeInfo.imageLinks?.thumbnail || '/images/placeholder1.png'
                },
                language: book.volumeInfo.language || 'Not known',
                pageCount: book.volumeInfo.pageCount || 0,
                publisher: book.volumeInfo.publisher || 'Not available',
                genres: book.volumeInfo.categories || ['Not available'],
                ratings: book.volumeInfo.averageRating || 'Not available'
            }
        };
        
        dispatch(addBook(bookData))
            .then(() => {
                setAlert({ type: 'success', msg: 'Book added successfully!' });
            })
            .catch(() => {
                setAlert({ type: 'danger', msg: 'Failed to add the book.' });
            });
    };

    const clearAlert = () => {
        setAlert(null);
    };

    // IntersectionObserver callback to detect when the user reaches the end of the list
    const lastBookElementRef = (node) => {
        if (loading || isFetchingMore) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1); // Load the next page when user reaches the end
            }
        });

        if (node) observer.current.observe(node);
    };

    useEffect(() => {
            document.title = "Shelflyst - Search";
        
    }, []);
    // Fetch books when page changes (triggered by intersection observer)
    useEffect(() => {
        if (page > 0) {
            fetchBooks(page); // Fetch more books when the user reaches the end
            document.title = "Shelflyst - Search";
        }
    }, [page]);

    return (
        <>
            <div className="container pt-5 mt-5">
                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} onSearch={handleSearch} />
                {alert && <Alert alert={alert} clearAlert={clearAlert} />} {/* Show alert */}
                {loading && <p><DotPulse /></p>}
                {error && <p>Error: {error}</p>}
                {books.length === 0 && !loading && !error ? (
                    <div className="text-center">
                        <h2>Enter a search term to find books!</h2>
                    </div>
                ) : (
                    <div className="d-flex flex-wrap justify-content-around">
                        {books.map((book, index) => {
                            const isAlreadyAdded = addedBooks.some((addedBook) => addedBook.id === book.id);
                            
                            if (index === books.length - 1) {
                                return (
                                    <div ref={lastBookElementRef} key={book.id}>
                                        <BookItem
                                            title={book.volumeInfo.title}
                                            authors={book.volumeInfo.authors || []}
                                            publishedDate={book.volumeInfo.publishedDate || 'Unknown'}
                                            thumbnail={book.volumeInfo.imageLinks?.thumbnail || ''}
                                            description={book.volumeInfo.description || 'Not available'}
                                            genres={book.volumeInfo.categories || []}
                                            language={book.volumeInfo.language || 'Not known'}
                                            pageCount={book.volumeInfo.pageCount || 'Not available'}
                                            ratings={book.volumeInfo.averageRating || 'Not available'}
                                            showAddButton={true}
                                            onAddClick={() => handleAddClick(book)}
                                            isAdded={isAlreadyAdded}
                                            onRemoveClick={() => {}}
                                            isShared = {true}
                                        />
                                    </div>
                                );
                            } else {
                                return (
                                    <BookItem
                                        key={book.id}
                                        title={book.volumeInfo.title}
                                        authors={book.volumeInfo.authors || []}
                                        publishedDate={book.volumeInfo.publishedDate || 'Unknown'}
                                        thumbnail={book.volumeInfo.imageLinks?.thumbnail || ''}
                                        description={book.volumeInfo.description || 'Not available'}
                                        genres={book.volumeInfo.categories || []}
                                        language={book.volumeInfo.language || 'Not known'}
                                        pageCount={book.volumeInfo.pageCount || 'Not available'}
                                        ratings={book.volumeInfo.averageRating || 'Not available'}
                                        showAddButton={true}
                                        onAddClick={() => handleAddClick(book)}
                                        isAdded={isAlreadyAdded}
                                        onRemoveClick={() => {}}
                                        isShared={true}
                                    />
                                );
                            }
                        })}
                    </div>
                )}
                {/* Show loading indicator at the bottom when fetching more */}
                {isFetchingMore && <div className="text-center my-4"><DotPulse /></div>}
            </div>
        </>
    );
}

export default BookSearch;
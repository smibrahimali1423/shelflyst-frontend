import React from 'react';
import { FaShareAlt } from 'react-icons/fa';  // Import the share icon
import { useNavigate } from 'react-router-dom';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton'; 

function BookItem({
    title = 'No Title', 
    authors = [], 
    publishedDate = 'No Date',
    thumbnail = '/images/placeholder1.png',
    description = 'No Description',
    genres = [], 
    language = 'No Language', 
    pageCount = 'No Page Count',
    ratings = 'No Ratings',
    isAdded = false,
    onAddClick = () => {},
    onRemoveClick = () => {},
    showAddButton = false,
    onShareClick = () => {},
    isShared = false // Add this prop to check if the book is shared
}) {
    const navigate = useNavigate();

    const truncatedDescription = (description || '').length > 100 ? (description || '').slice(0, 100) + '...' : description || '';
    const truncatedTitle = (title || '').length > 20 ? (title || '').slice(0, 20) + '...' : title || '';

    const authorsList = authors || 'Not available';

    const handleCardClick = () => {
        navigate('/book-details', {
            state: {
                title,
                authors,
                publishedDate,
                thumbnail,
                description,
                genres, 
                language, 
                pageCount,
                ratings
            }
        });
    };

    return (
        <div className="card mb-5 pt-2" style={{ width: '18rem', cursor: 'pointer', position: 'relative' }} onClick={handleCardClick}>
            <img
                src={thumbnail}
                className="card-img-top d-block mx-auto"
                alt={title}
                style={{ height: '310px', width: '80%' }}
            />
            <div className="card-body" style={{ height: '300px', overflow: 'hidden' }}>
                <h5 className="card-title">{truncatedTitle}</h5>
                <p className="card-text"><strong>Author(s):</strong> {authorsList}</p>
                <p className="card-text"><strong>Published:</strong> {publishedDate}</p>
                <p className="card-text description">{truncatedDescription}</p>
            </div>

            {/* Share Icon */}
            <FaShareAlt
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '14px', // Make the icon smaller by reducing the font size
                    cursor: isShared ? 'not-allowed' : 'pointer', // Disable cursor when shared
                    color: isShared ? '#d6d6d6' : '#007bff', // Change color when shared
                }}
                onClick={(e) => {
                    if (isShared) return; // If already shared, do nothing
                    e.stopPropagation(); // Prevents triggering the card click event
                    console.log('Share this book!');
                    onShareClick();
                    // Add functionality to share book
                }}
            />

            {/* Conditionally render AddButton or RemoveButton */}
            {showAddButton ? (
                <AddButton onAddClick={onAddClick} isAdded={isAdded} />
            ) : (
                <RemoveButton onRemoveClick={onRemoveClick} />
            )}
        </div>
    );
}

export default BookItem;
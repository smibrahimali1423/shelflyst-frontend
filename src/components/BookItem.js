import React from 'react';
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
    showAddButton = false
}) {
    const navigate = useNavigate(); // Initialize the navigate function

    // Ensure description and title are not undefined
    const truncatedDescription = (description || '').length > 100 ? (description || '').slice(0, 100) + '...' : description || '';
    const truncatedTitle = (title || '').length > 20 ? (title || '').slice(0, 20) + '...' : title || '';

    // Ensure authors is always an array
    const authorsList = Array.isArray(authors) ? authors.join(', ') : 'Not available';

    // Navigate to the detailed view with book data
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
        <div className="card mb-5 pt-2" style={{ width: '18rem', cursor: 'pointer' }} onClick={handleCardClick}>
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

            {/* Conditionally render AddButton or RemoveButton based on showAddButton */}
            {showAddButton ? (
                <AddButton onAddClick={onAddClick} isAdded={isAdded} />
            ) : (
                <RemoveButton onRemoveClick={onRemoveClick} />
            )}
        </div>
    );
}

export default BookItem;

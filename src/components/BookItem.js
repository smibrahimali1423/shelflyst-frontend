import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
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
    isShared = false, // true hides/disables the share icon
}) {
    const navigate = useNavigate();

    const safeDescription = description || '';
    const truncatedDescription = safeDescription.length > 110 ? safeDescription.slice(0, 110) + '...' : safeDescription;
    const authorsList = (Array.isArray(authors) ? authors.join(', ') : authors) || 'Not available';
    const coverSrc = thumbnail || '/images/placeholder1.png';

    const handleCardClick = () => {
        // Send real values only; placeholders like 'No Ratings' become "Not available" on the details page.
        const asList = Array.isArray(authors) ? authors : (authors ? String(authors).split(',').map((a) => a.trim()) : []);
        const known = (value, placeholder) => (value && value !== placeholder ? value : null);
        navigate('/book-details', {
            state: {
                title,
                authors: asList,
                publishedDate,
                thumbnail,
                description,
                genres,
                language: known(language, 'No Language'),
                pageCount: known(pageCount, 'No Page Count'),
                ratings: typeof ratings === 'number' ? ratings : null,
            },
        });
    };

    return (
        <div className="card book-card h-100" onClick={handleCardClick}>
            <div className="book-cover-wrap">
                <img src={coverSrc} className="book-cover" alt={title} loading="lazy" />
            </div>

            {!showAddButton && (
                <button
                    type="button"
                    className={`share-btn ${isShared ? 'is-shared' : ''}`}
                    title={isShared ? 'Already shared' : 'Share with the community'}
                    aria-label={isShared ? 'Already shared' : 'Share with the community'}
                    disabled={isShared}
                    onClick={(e) => {
                        e.stopPropagation(); // don't open the details page
                        if (!isShared) onShareClick();
                    }}
                >
                    <FaShareAlt />
                </button>
            )}

            <div className="card-body d-flex flex-column">
                <h5 className="card-title book-title" title={title}>{title}</h5>
                <p className="book-meta mb-1"><strong>Author(s):</strong> {authorsList}</p>
                <p className="book-meta mb-2"><strong>Published:</strong> {publishedDate}</p>
                <p className="book-description mb-0">{truncatedDescription}</p>
            </div>

            {showAddButton ? (
                <AddButton onAddClick={onAddClick} isAdded={isAdded} />
            ) : (
                <RemoveButton onRemoveClick={onRemoveClick} />
            )}
        </div>
    );
}

export default BookItem;

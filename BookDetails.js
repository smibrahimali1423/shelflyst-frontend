import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function BookDetails() {
  const location = useLocation();
  const { 
    title, 
    authors, 
    publishedDate, 
    thumbnail, 
    description,
    genres = [], 
    language, 
    pageCount,
    ratings
  } = location.state || {};

  useEffect(() => {
     window.scrollTo(0,0);
     document.title = "Shelflyst - Book Details";
 }, []);

  return (
    <div style={{ 
      display: 'flex', 
      height: 'calc(100vh - 200px)', 
      margin: '100px 0', 
    }}>
      <div 
        className="book-image"
        style={{ 
          flex: '0 0 50%', 
          height: '100%', 
          background: `url(${thumbnail ? thumbnail : '/images/placeholder1.png'}) no-repeat center center`, 
          backgroundSize: 'contain', 
          position: 'sticky', 
          top: '0', 
          zIndex: 1 
        }}
      />
      <div 
        className="book-details"
        style={{ 
          flex: '1', 
          overflowY: 'auto', 
          padding: '20px',
          backgroundColor: '#fff',
          height: '100%', 
          boxSizing: 'border-box',
        }}
      >
        <h2 className="mb-3">{title}</h2>
        <p className="mb-2"><strong>Author(s):</strong> {Array.isArray(authors) ? authors.join(', ') : 'Not available'}</p>
        <p className="mb-2"><strong>Published Date:</strong> {publishedDate || 'Not available'}</p>
        <p className="mb-2"><strong>Genres:</strong> {genres.length ? genres.join(', ') : 'Not available'}</p>
        <p className="mb-2"><strong>Language:</strong> {language || 'Not available'}</p>
        <p className="mb-2"><strong>Page Count:</strong> {pageCount || 'Not available'}</p>
        <p className="mb-2"><strong>Ratings:</strong> {ratings ? `${ratings} / 5` : 'Not available'}</p>
        <p className="mt-3"><strong>Description:</strong></p>
        <p>{description || 'Not available'}</p>
      </div>
    </div>
  );
}

export default BookDetails;

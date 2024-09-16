import React from 'react';

function AddBooks({ handleAddBooksClick }) {
    return (
        <button
            type="button"
            className="btn btn-outline-primary btn-sm d-flex align-items-center me-4"
            onClick={handleAddBooksClick}
            style={{ fontSize: '0.8rem', height: '2rem', padding: '0.2rem 0.5rem' }} // Adjusted font size, height, and padding
        >
            <i className="fa-solid fa-book me-1" style={{ fontSize: '0.8rem' }}></i>
            <span className="d-none d-sm-inline">Add books</span> {/* Hide text on smaller screens if needed */}
        </button>
    );
}

export default AddBooks;

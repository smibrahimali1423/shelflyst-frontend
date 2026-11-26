import React from 'react';

function AddBooks({ handleAddBooksClick }) {
    return (
        <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center add-books-btn"
            onClick={handleAddBooksClick}
        >
            <i className="fa-solid fa-plus me-1"></i>
            <span>Add books</span>
        </button>
    );
}

export default AddBooks;

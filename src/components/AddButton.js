import React from 'react';

function AddButton({ onAddClick, isAdded }) {
    const handleClick = (event) => {
        event.stopPropagation(); // Stop the click event from bubbling up
        if (onAddClick) {
            onAddClick(); // Call the provided add click handler if it's defined
        }
    };

    return (
        <div className="card-footer book-card-footer">
            <button
                className={`btn btn-sm w-100 ${isAdded ? 'btn-outline-success' : 'btn-success'}`}
                onClick={handleClick}
                disabled={isAdded}
            >
                <i className={`fas ${isAdded ? 'fa-check' : 'fa-plus-circle'} me-1`}></i> {isAdded ? 'On your shelf' : 'Add'}
            </button>
        </div>
    );
}

export default AddButton;

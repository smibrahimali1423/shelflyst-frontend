import React from 'react';

function RemoveButton({ onRemoveClick }) {
    const handleClick = (event) => {
        event.stopPropagation(); // Prevents the event from bubbling up
        if (onRemoveClick) {
            onRemoveClick(); // Calls the remove click handler if it's defined
        }
    };
    
    return (
        <div className="card-footer book-card-footer">
            <button className="btn btn-outline-danger btn-sm w-100" onClick={handleClick}>
                <i className="fas fa-minus-circle me-1"></i> Remove
            </button>
        </div>
    );
}

export default RemoveButton;

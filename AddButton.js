import React from 'react';

function AddButton({ onAddClick, isAdded }) {
    const handleClick = (event) => {
        event.stopPropagation(); // Stop the click event from bubbling up
        if (onAddClick) {
            onAddClick(); // Call the provided add click handler if it's defined
        }
    };

    return (
        <div className="card-footer" style={{ background: 'transparent', borderTop: 'none', marginTop: 'auto' }}>
            <button
                className="btn btn-success btn-block mb-3"
                onClick={handleClick}
                disabled={isAdded}
            >
                <i className="fas fa-plus-circle"></i> Add
            </button>
        </div>
    );
}

export default AddButton;

import React from 'react';

function RemoveButton({ onRemoveClick }) {
    const handleClick = (event) => {
        event.stopPropagation(); // Prevents the event from bubbling up
        if (onRemoveClick) {
            onRemoveClick(); // Calls the remove click handler if it's defined
        }
    };
    
    return (
        <div className="card-footer" style={{ background: 'transparent', borderTop: 'none', marginTop: 'auto' }}>
            <button className="btn btn-danger btn-block mb-3" onClick={handleClick}>
                <i className="fas fa-minus-circle"></i> Remove
            </button>
        </div>
    );
}

export default RemoveButton;

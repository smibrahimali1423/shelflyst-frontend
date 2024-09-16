import React from 'react';

function SearchBar({ searchTerm, onSearchChange, onSearch }) {
    return (
        <div className="d-flex justify-content-center my-4 w-100"> {/* Center the search bar */}
            <div className="input-group" style={{ maxWidth: '500px' }}> {/* Set a max-width for alignment */}
                <input
                    type="search"
                    id="search-input"
                    className="form-control"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={onSearchChange}
                    style={{ borderRadius: '0.25rem 0 0 0.25rem' }} // Rounded corners on the left side
                />
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={onSearch}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0 0.25rem 0.25rem 0', // Rounded corners on the right side
                        padding: '0 1rem',
                    }}
                >
                    <i className="fas fa-search" style={{ fontSize: '1.2rem' }}></i>
                </button>
            </div>
        </div>
    );
}

export default SearchBar;

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AddBooks from './AddBooks';
import UserModal from './UserModal';
import SharedBooks from './SharedBooks'; // Import SharedBooks

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route location

    const handleAddBooksClick = () => {
        navigate('/booksearch');
    };

    // Determine if the current route is the booklist route
    const isHomeDisabled = location.pathname === '/booklist';
    const isAboutDisabled = location.pathname === '/about';
    const isSharedBooksDisabled = location.pathname === '/sharedbooks'; // New route check for SharedBooks
    const isRecommendationsDisabled = location.pathname === '/recommendations'; // Add this line to define isRecommendationsDisabled
    const isBookSearchPage = location.pathname === '/booksearch';

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-3">
            <Link className="navbar-brand" to="#">Shelflyst</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item active">
                        <Link
                            className={`nav-link ${isHomeDisabled ? 'disabled' : ''}`}
                            to="/booklist"
                            aria-disabled={isHomeDisabled} // Add aria-disabled for accessibility
                        >
                            Home <span className="visually-hidden">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${isAboutDisabled ? 'disabled' : ''}`}
                            to="/about"
                            aria-disabled={isAboutDisabled} // Add aria-disabled for accessibility
                        >
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        {/* Apply disabled class if on /sharedbooks page */}
                        <Link
                            className={`nav-link ${isSharedBooksDisabled ? 'disabled' : ''}`}
                            to="/sharedbooks"
                            aria-disabled={isSharedBooksDisabled} // Add aria-disabled for accessibility
                        >
                            Shared Books
                        </Link>
                    </li>
                    
                </ul>

                {/* Conditionally render the AddBooks component */}
                {!isBookSearchPage && <AddBooks handleAddBooksClick={handleAddBooksClick} />}
                
                <UserModal /> {/* UserModal should be clickable */}
            </div>
        </nav>
    );
}

export default Navbar;

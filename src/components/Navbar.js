import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AddBooks from './AddBooks';
import UserModal from './UserModal';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddBooksClick = () => {
        navigate('/booksearch');
    };

    // Determine if the current route matches any of these pages
    const isHomeDisabled = location.pathname === '/booklist';
    const isAboutDisabled = location.pathname === '/about';
    const isSharedBooksDisabled = location.pathname === '/sharedbooks';
    const isRecommendationsDisabled = location.pathname === '/recommendations';
    const isBookSearchPage = location.pathname === '/booksearch';

    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-3" style={{ height: '80px' }}>
<Link className="navbar-brand d-flex align-items-center" to="/booklist" style={{ fontSize: '26px' }}>
        <img
            src="/images/img1.png"
            alt="Logo"
            style={{
                width: '60px',    // Increased width
                height: '60px',   // Increased height
                marginRight: '12px',
                objectFit: 'contain',
            }}
        />
        Shelflyst
    </Link>
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
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${isHomeDisabled ? 'disabled' : ''}`}
                            to="/booklist"
                            aria-disabled={isHomeDisabled}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${isAboutDisabled ? 'disabled' : ''}`}
                            to="/about"
                            aria-disabled={isAboutDisabled}
                        >
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${isSharedBooksDisabled ? 'disabled' : ''}`}
                            to="/sharedbooks"
                            aria-disabled={isSharedBooksDisabled}
                        >
                            Shared Books
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link
                            className={`nav-link ${isRecommendationsDisabled ? 'disabled' : ''}`}
                            to="/recommendations"
                            aria-disabled={isRecommendationsDisabled}
                        >
                            Recommendations
                        </Link>
                    </li> */}
                </ul>

                {/* Conditionally show AddBooks button only outside book search */}
                {!isBookSearchPage && <AddBooks handleAddBooksClick={handleAddBooksClick} />}

                {/* User modal/profile button */}
                <UserModal />
            </div>
        </nav>
    );
}

export default Navbar;

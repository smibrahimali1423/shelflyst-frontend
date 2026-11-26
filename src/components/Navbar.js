import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import AddBooks from './AddBooks';
import UserModal from './UserModal';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    // The menu is opened and closed with React state, so it works on phones
    // without relying on Bootstrap's JavaScript (which isn't loaded).
    const [menuOpen, setMenuOpen] = useState(false);

    // Close the mobile menu whenever the page changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const handleAddBooksClick = () => {
        navigate('/booksearch');
    };

    const isBookSearchPage = location.pathname === '/booksearch';
    const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top px-3 app-navbar">
            <Link className="navbar-brand d-flex align-items-center app-brand" to="/booklist">
                <img src="/images/img1.png" alt="Shelflyst logo" className="app-brand-logo" />
                Shelflyst
            </Link>

            <button
                className="navbar-toggler app-menu-toggle"
                type="button"
                aria-controls="navbarSupportedContent"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation"
                onClick={() => setMenuOpen((open) => !open)}
            >
                {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>

            <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className={linkClass} to="/booklist">My Shelf</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={linkClass} to="/sharedbooks">Shared Books</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={linkClass} to="/about">About</NavLink>
                    </li>
                </ul>

                <div className="d-flex align-items-center gap-3 navbar-actions">
                    {/* Hide the Add books button on the search page itself */}
                    {!isBookSearchPage && <AddBooks handleAddBooksClick={handleAddBooksClick} />}
                    <UserModal />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

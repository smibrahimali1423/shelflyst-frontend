import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../UserModal.css';
import LogoutButton from './LogoutButton';

function UserModal() {
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        const storedUserName = sessionStorage.getItem('userName');
        console.log("Stored userName from localStorage (initial check):", storedUserName); // Debugging line
        if (storedUserName) {
            setUserName(storedUserName);
            console.log("userName state set to:", storedUserName); // Debugging line
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };


    return (
        <div className="position-relative">
            <div className="d-flex align-items-center user-info me-4" onClick={togglePopup}>
                <i className="fa-solid fa-user me-2"></i>
                <span className="navbar-text">{userName || 'Loading...'}</span>
            </div>

            {showPopup && (
                <div className="user-popup" ref={popupRef}>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                            <Link to="/profile" className="text-decoration-none">Profile</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/settings" className="text-decoration-none">Settings</Link>
                        </li>
                        <li>
                            <LogoutButton/>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserModal;

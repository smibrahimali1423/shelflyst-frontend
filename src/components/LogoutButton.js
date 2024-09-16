import React from 'react';

function LogoutButton() {
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('date');
        window.location.href = '/';
      };

    return (
        <button
            type="button"
            className="btn btn-outline-danger d-flex align-items-center ms-1"
            style={{ fontSize: '0.67rem', padding: '0.375rem 0.75rem' }}
            onClick={handleLogoutClick}
        >
            <i className="fa-solid fa-sign-out-alt me-1"></i>
            Logout
        </button>
    );
}

export default LogoutButton;

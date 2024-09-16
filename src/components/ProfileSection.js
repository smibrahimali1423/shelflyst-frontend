import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../ProfileSection.css'
import { useEffect } from 'react';

function ProfileSection() {
    // Access user info and totalBooks from Redux store
    const { name, email, accountCreated } = {
        name: sessionStorage.getItem('userName') || 'Not available',
        email: sessionStorage.getItem('email') || 'Not available',
        accountCreated: sessionStorage.getItem('date') || 'Not available',
    };

    useEffect(() => {
        document.title = "Shelflyst - Profile";

    })
    const totalBooks = useSelector((state) => state.books.bookCount);

    return (
        <section className="profile-section pt-5 mt-5">
            <Card className="mb-3" style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
                <Card.Body>
                    <Card.Title className="text-center">Profile</Card.Title>
                    <div className="profile-info">
                        <h5>Name:</h5>
                        <p>{name}</p>
                    </div>
                    <div className="profile-info">
                        <h5>Email:</h5>
                        <p>{email}</p>
                    </div>
                    <div className="profile-info">
                        <h5>Account Created On:</h5>
                        <p>{accountCreated !== 'Not available' ? new Date(accountCreated).toLocaleDateString() : 'Not available'}</p>
                    </div>
                    <div className="profile-info">
                        <h5>Total Books:</h5>
                        <p>{totalBooks !== undefined ? totalBooks : 'Not available'}</p>
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
}

export default ProfileSection;

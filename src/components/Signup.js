import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/signUpThunks'; // Import the correct thunk
import { useNavigate } from 'react-router-dom';
import TermsModal from './TermsModal'; // Adjust the path if needed

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null); // State for password mismatch error
    const [showTermsModal, setShowTermsModal] = useState(false); // State to control modal visibility
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        document.title = "Shelflyst - Signup";
    
      })
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/booklist');
        }
    }, [isAuthenticated, navigate]);
        
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        } else {
            setPasswordError(null); // Clear the error if passwords match
        }

        dispatch(signup(name, email, password)); // Dispatch the signup action with name, email, and password
    };

    const handleShowTerms = () => setShowTermsModal(true);
    const handleCloseTerms = () => setShowTermsModal(false);

    return (
        <section className="vh-100 bg-light d-flex align-items-center justify-content-center" style={{ overflow: 'hidden' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card shadow-sm rounded">
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <img src={`${process.env.PUBLIC_URL}/images/img1.png`} alt="Logo" 
                                        style={{ width: '200px', height: '200px' }} 
                                    />
                                </div>
                                <h1 className="text-center mb-4 mt-4">Sign up</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="confirm-password" className="form-label">Repeat your password</label>
                                        <input
                                            type="password"
                                            id="confirm-password"
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Password mismatch error message */}
                                    {passwordError && (
                                        <div className="alert alert-danger" role="alert">
                                            {passwordError}
                                        </div>
                                    )}

                                    <div className="form-check mb-4">
                                        <input className="form-check-input" type="checkbox" id="terms" required />
                                        <label className="form-check-label" htmlFor="terms">
                                            I agree to all statements in <a href="#!" onClick={handleShowTerms}>Terms of service</a>
                                        </label>
                                    </div>

                                    {/* Server-side error message */}
                                    {error && <div className="alert alert-danger">{error}</div>}

                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading ? 'Registering...' : 'Register'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms of Service Modal */}
            <TermsModal show={showTermsModal} handleClose={handleCloseTerms} />
        </section>
    );
}

export default Signup;

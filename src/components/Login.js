import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authThunks';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Redirect to the book list page when the user is authenticated
  useEffect(() => {
    console.log('useEffect triggered', { isAuthenticated });
    if (isAuthenticated ) {
      navigate('/booklist');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    document.title = "Shelflyst";

  })

    useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password)); // Wait for the login process to complete
  };

  return (
    <section className="h-100" style={{ backgroundColor: '#eee'   }}>
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="row w-100 d-flex justify-content-center align-items-center">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black h-100" style={{zoom: "1.02", overflow: 'hidden'}}>
              <div className="row g-0 h-100">
                <div className="col-lg-6 d-flex align-items-center">
                  <div className="card-body p-md-5 mx-md-4 w-100">
                    <div className="text-center">
                      
                      <img src={`${process.env.PUBLIC_URL}/images/img1.png`} alt="Logo" 
                        style={{ width: '200px', height: '200px' }} 
                      />
                      <h4 className="mt-1 mb-5 pb-1">For Booklovers!</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p>Please login to your account</p>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      <div className="mb-4">
                        <label className="form-label" htmlFor="form2Example11">Username</label>
                        <input 
                          type="email" 
                          id="form2Example11" 
                          className="form-control"
                          placeholder="Email address" 
                          aria-label="Username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label" htmlFor="form2Example22">Password</label>
                        <input 
                          type="password" 
                          id="form2Example22" 
                          className="form-control" 
                          aria-label="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button 
                          className="btn btn-primary btn-block mb-3" 
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Logging in...' : 'Log in'}
                        </button>
                        {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button 
                          type="button" 
                          className="btn btn-outline-danger"
                          onClick={() => {
                            console.log('Navigating to signup');

                            navigate('/signup');}}
                        >
                          Create new
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-6 d-flex align-items-center bg-primary">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Indulge in the world of books!</h4>
                    <p className="small mb-0">
                    Shelflyst is a platform designed to help users personalize their book collections. With Shelflyst, you can easily search for books, add them to your collection, and manage your shelf in a seamless and intuitive way.
                    {/* <div className="text-white text-center py-2">
                    <p className="credits">Developed by <strong>Syed Mohammed Ibrahim Ali</strong></p>
                  </div> */}

                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

import { loginStart, loginSuccess, loginFailure, logout, sessionRestored, sessionCheckFinished } from './authSlice';
const host = "https://shelflyst-backend-2.onrender.com" 
export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.authtoken);

      try {
        const userNameResponse = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({}),
        });
        const userNameFetched = await userNameResponse.json();

        if (userNameResponse.ok) {
          if (userNameFetched && userNameFetched.name) {
            sessionStorage.setItem('userName', userNameFetched.name);
            sessionStorage.setItem('email', userNameFetched.email);
            sessionStorage.setItem('date', userNameFetched.date);
            sessionStorage.setItem('userId', userNameFetched._id);
          } else {
            dispatch(loginFailure('User name not available'));
          }
        } else {
          dispatch(loginFailure(userNameFetched.error || 'Error fetching user name.'));
        }
      } catch (error) {
        dispatch(loginFailure('Error fetching user name.'));
        console.log("API Error:", error);
      }

      dispatch(loginSuccess({ token: data.authtoken, user: data.user }));
    } else {
      dispatch(loginFailure(data.error || 'Error during login.'));
    }
  } catch (error) {
    dispatch(loginFailure('Error occurred during login.'));
    console.log("API Error:", error);
  }
};

// Restore the session after a page refresh or when opening a link directly.
// A saved token is checked with the backend: if it is still valid the user stays
// logged in; if the backend rejects it, the user is logged out.
export const restoreSession = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(sessionCheckFinished());
    return;
  }
  try {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': token },
      body: JSON.stringify({}),
    });
    if (response.status === 401) {
      dispatch(logout());
      return;
    }
    const user = await response.json();
    if (response.ok && user && user.name) {
      sessionStorage.setItem('userName', user.name);
      sessionStorage.setItem('email', user.email);
      sessionStorage.setItem('date', user.date);
      sessionStorage.setItem('userId', user._id);
      dispatch(sessionRestored(user));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    // Network error (e.g. the free backend is waking up): keep the user logged in.
    console.log('Could not check session:', error);
    dispatch(sessionCheckFinished());
  }
};

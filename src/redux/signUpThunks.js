import { signupStart, signupSuccess, signupFailure } from './authSlice';
const host = "https://shelflyst-backend-2.onrender.com"; 

export const signup = (name, email, password) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      // Store the token in localStorage
      localStorage.setItem('token', data.authtoken);

      // Fetch the user's name using the token
      try {
        const userNameResponse = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });
        const userNameFetched = await userNameResponse.json();

        if (userNameResponse.ok) {
          if (userNameFetched && userNameFetched.name) {
            // Store the user's name in sessionStorage
            sessionStorage.setItem('userName', userNameFetched.name);
            sessionStorage.setItem('email', userNameFetched.email);
            sessionStorage.setItem('date', userNameFetched.date);
          } else {
            dispatch(signupFailure('User name not available'));
          }
        } else {
          dispatch(signupFailure(userNameFetched.error || 'An error occurred in fetching username.'));
        }
      } catch (error) {
        dispatch(signupFailure('An error occurred in fetching username.'));
        console.error("API Error in fetching username:", error);
      }

      // Dispatch signup success with the token and user info
      dispatch(signupSuccess({ token: data.authtoken, user: data.user }));
    } else {
      dispatch(signupFailure(data.error || 'An error occurred during signup.'));
    }
  } catch (error) {
    dispatch(signupFailure('An error occurred.'));
    console.error("API Error:", error);
  }
};

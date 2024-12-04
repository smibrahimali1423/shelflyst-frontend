import { loginStart, loginSuccess, loginFailure } from './authSlice';
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

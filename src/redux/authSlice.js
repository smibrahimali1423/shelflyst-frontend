import { createSlice } from '@reduxjs/toolkit';

const savedToken = localStorage.getItem('token');

const initialState = {
  token: savedToken || null,
  user: null,
  loading: false,
  error: null,
  // A saved token means the user was logged in before the page was refreshed.
  // It is checked against the backend once on startup (see restoreSession).
  isAuthenticated: !!savedToken,
  authChecked: !savedToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.authChecked = true;
      localStorage.removeItem('token');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userId');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    sessionRestored: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.authChecked = true;
    },
    sessionCheckFinished: (state) => {
      state.authChecked = true;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userId');
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  signupStart, signupSuccess, signupFailure, 
  loginStart, loginSuccess, loginFailure, 
  logout, setUser, sessionRestored, sessionCheckFinished,
  deleteUserStart, deleteUserSuccess, deleteUserFailure 
} = authSlice.actions;

export default authSlice.reducer;

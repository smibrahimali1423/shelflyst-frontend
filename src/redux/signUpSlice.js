import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
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
      sessionStorage.setItem('userName', action.payload.name )
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userName')
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, logout, setUser } = signupSlice.actions;

export default signupSlice.actions;

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import booksReducer from './booksSlice';
import signupReducer from './signUpSlice';
import searchReducer from './searchSlice'; // Import the new slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    signup: signupReducer,
    search: searchReducer, // Add it to the store
  },
});

export default store;

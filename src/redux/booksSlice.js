import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  loading: false,
  error: null,
  bookCount: 0,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true;
    },
    fetchBooksSuccess: (state, action) => {
      state.books = action.payload;
      state.bookCount = action.payload.length;
      state.loading = false;
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
      state.bookCount = state.books.length;
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      state.bookCount = state.books.length;
    },
    clearBooks: (state) => {
      state.books = [];
      state.bookCount = 0;
    },
  },
});

export const { 
  fetchBooksStart, 
  fetchBooksSuccess, 
  fetchBooksFailure, 
  addBook, 
  deleteBook, 
  clearBooks 
} = booksSlice.actions;

export default booksSlice.reducer;

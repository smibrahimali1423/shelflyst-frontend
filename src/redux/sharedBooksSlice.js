import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sharedBooks: [],
  sharedBookCount: 0,
  loading: false,
  error: null,
};

const sharedBooksSlice = createSlice({
  name: 'sharedBooks',
  initialState,
  reducers: {
    fetchSharedBooksStart: (state) => {
      state.loading = true;
    },
    fetchSharedBooksSuccess: (state, action) => {
      state.sharedBooks = action.payload;
      state.sharedBookCount = action.payload.length;
      state.loading = false;
    },
    fetchSharedBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    shareBook: (state, action) => {
      state.sharedBooks.push(action.payload);
      state.sharedBookCount = state.sharedBooks.length;
    },
    removeSharedBook: (state, action) => {
      state.sharedBooks = state.sharedBooks.filter((book) => book._id !== action.payload);
      state.sharedBookCount = state.sharedBooks.length;
    },
    clearSharedBooks: (state) => {
      state.sharedBooks = [];
      state.sharedBookCount = 0;
    },
  },
});

export const { 
  fetchSharedBooksStart, 
  fetchSharedBooksSuccess, 
  fetchSharedBooksFailure, 
  shareBook, 
  removeSharedBook,
  clearSharedBooks 
} = sharedBooksSlice.actions;

export default sharedBooksSlice.reducer;

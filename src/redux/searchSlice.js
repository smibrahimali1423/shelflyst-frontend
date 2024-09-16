// src/redux/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchStart: (state) => {
      state.loading = true;
    },
    searchSuccess: (state, action) => {
      state.searchResults = action.payload;
      state.loading = false;
    },
    searchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    }
  },
});

export const { searchStart, searchSuccess, searchFailure, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;

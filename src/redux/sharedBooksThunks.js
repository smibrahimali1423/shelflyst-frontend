import { fetchSharedBooksStart, fetchSharedBooksSuccess, fetchSharedBooksFailure, shareBook, clearSharedBooks } from './sharedBooksSlice';

const host = "https://shelflyst-backend-2.onrender.com"  

// Fetch all shared books
export const fetchSharedBooks = () => async (dispatch) => {
  dispatch(fetchSharedBooksStart());
  try {
    const response = await fetch(`${host}/api/bookdetails/getcommonbooks`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch shared books.');
    }
    const data = await response.json();
    dispatch(fetchSharedBooksSuccess(data));
  } catch (error) {
    dispatch(fetchSharedBooksFailure(error.message));
  }
};

// Add a book to shared books
export const shareBookToCommunity = (book) => async (dispatch) => {
  try {
    const response = await fetch(`${host}/api/bookdetails/addcommonbook`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error('Failed to share book.');
    }

    const sharedBook = await response.json();
    dispatch(shareBook(sharedBook)); // Dispatch the action to add the shared book to Redux
  } catch (error) {
    console.error('Error sharing book:', error);
    alert('Failed to share the book. Please try again.');
  }
};

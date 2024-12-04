import { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure, addBook as addBookAction, deleteBook as deleteBookAction, clearBooks} from './booksSlice';

const host = "https://shelflyst-backend-2.onrender.com" 
export const fetchBooks = () => async (dispatch) => {
  dispatch(fetchBooksStart());
  try {
    const response = await fetch(`${host}/api/bookdetails/getallbooks`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch books.');
    }
    const data = await response.json();
    dispatch(fetchBooksSuccess(data));
  } catch (error) {
    dispatch(fetchBooksFailure(error.message));
  }
};

export const addBook = (book) => async (dispatch) => {
  try {
    const addBookResponse = await fetch(`${host}/api/bookdetails/addbook`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    if (!addBookResponse.ok) {
      throw new Error('Failed to add book.');
    }

    // Assuming the API returns the added book
    const addedBook = await addBookResponse.json();
    
    // Dispatch the action to add the book to the Redux store
    dispatch(addBookAction(addedBook));
  } catch (error) {
    console.error('Error adding book:', error);
    alert('Failed to add book. Please try again.');
  }
};

export const deleteBook = (bookId) => async (dispatch) => {
  try {
    const deleteBookResponse = await fetch(`${host}/api/bookdetails/deletebook/${bookId}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });

    if (!deleteBookResponse.ok) {
      throw new Error('Failed to delete book.');
    }

    // Assuming the backend responds with the deleted book ID or confirmation
    const deletedBook = await deleteBookResponse.json();
    
    // Dispatch the action to remove the book from the Redux store
    dispatch(deleteBookAction(bookId));
  } catch (error) {
    console.error('Error deleting book:', error);
    alert('Failed to delete the book. Please try again.');
  }
};

export const deleteAllBooks = () => async (dispatch) => {
  try {
    const response = await fetch(`${host}/api/bookdetails/deleteallbooks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    if (response.ok) {
      dispatch(clearBooks());
      alert('All books deleted successfully.');
    } else {
      const data = await response.json();
      alert(`Failed to delete all books: ${data.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error deleting all books:', error);
    alert('An error occurred while deleting all books. Please try again.');
  }
};


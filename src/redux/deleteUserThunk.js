import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from './authSlice';
import { deleteAllBooks } from './booksSlice'; // Adjust the path as needed

const host = "http://localhost:4000";

export const deleteUser = () => async (dispatch) => {
  dispatch(deleteUserStart());
  try {
    const response = await fetch(`${host}/api/auth/deleteuser`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(deleteUserSuccess());
    } else {
      dispatch(deleteUserFailure(data.error || 'Error deleting user.'));
    }
  } catch (error) {
    dispatch(deleteUserFailure('Error occurred during user deletion.'));
    console.log("API Error:", error);
  }
};


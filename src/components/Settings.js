import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../redux/deleteUserThunk'; // Adjust the path as needed
import { logout } from '../redux/authSlice';
import { deleteAllBooks } from '../redux/booksThunks'; // Ensure this is the correct import
import Alert from './Alert';
import ConfirmationModal from './ConfirmationModal'; // Import the new modal component
import { useEffect } from 'react';

function Settings() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null); // 'resetProfile' or 'deleteUser'

  const handleShowModal = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  useEffect(() => {
    document.title = "Shelflyst - Settings";
  })
  const handleConfirm = async () => {
    setShowModal(false);
    if (actionType === 'resetProfile') {
      try {
        await dispatch(deleteAllBooks());
        setAlert({ type: 'success', msg: 'Profile reset successfully.' });
      } catch (err) {
        console.error("Error", 'Error resetting profile');
        setAlert({ type: 'error', msg: 'Failed to reset profile. Please try again.' });
      }
    } else if (actionType === 'deleteUser') {
      try {
        await dispatch(deleteUser());
        dispatch(logout());
        setAlert({ type: 'success', msg: 'Account deleted successfully.' });
        setTimeout(() => window.location.href = '/', 3000); // Redirect after a short delay
      } catch (err) {
        console.error('Error deleting user:', err);
        setAlert({ type: 'error', msg: 'Failed to delete account. Please try again.' });
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <div className="container pt-5 mt-5">
      <h2>Settings</h2>
      {error && <p className="text-danger">Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <div className="mt-4">
        <button className="btn btn-warning" onClick={() => handleShowModal('resetProfile')}>
          Reset Profile
        </button>
        <button className="btn btn-danger ms-3" onClick={() => handleShowModal('deleteUser')}>
          Delete Account
        </button>
      </div>
      {alert && <Alert alert={alert} clearAlert={clearAlert} />}
      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message={actionType === 'resetProfile'
          ? 'Are you sure you want to reset your profile? This will delete all your books.'
          : 'Are you sure you want to delete your account? This action cannot be undone.'}
      />
    </div>
  );
}

export default Settings;

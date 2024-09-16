import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import BookItemList from './components/BookItemList';
import BookSearch from './components/BookSearch';
import About from './components/About';
import BookDetails from './components/BookDetails';
import ProfileSection from './components/ProfileSection';
import Settings from './components/Settings';
import Navbar from './components/Navbar';

// ProtectedRoute component to handle authentication
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <>
      <Navbar /> {/* Show Navbar only if authenticated */}
      {element}
    </>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booklist" element={<ProtectedRoute element={<BookItemList />} />} />
        <Route path="/booksearch" element={<ProtectedRoute element={<BookSearch />} />} />
        <Route path="/about" element={<ProtectedRoute element={<About />} />} />
        <Route path="/book-details" element={<ProtectedRoute element={<BookDetails />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfileSection />} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
      </Routes>
    </Router>
  );
}

export default App;

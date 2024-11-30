import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('authToken'); // Check if token exists

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login page if not logged in
  }

  return children;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    return <Navigate to="/login" />; // jika belum login
  }

  if (user.role !== 'admin') {
    return <Navigate to="/app" />; // jika bukan admin, redirect ke dashboard user
  }

  return children;
};

export default AdminRoute;

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  // Check if the user is logged in and has admin rights
  const isAdmin = user && user.isAdmin;

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;

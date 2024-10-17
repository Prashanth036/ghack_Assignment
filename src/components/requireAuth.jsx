import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    console.log("ivuivyv")
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;

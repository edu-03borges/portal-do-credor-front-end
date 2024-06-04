import React from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from "layout/MainLayout";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('tokenportalcredor');

  return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

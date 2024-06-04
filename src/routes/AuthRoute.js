import React from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from "ui-component/Loadable";

const AuthLogin = Loadable(lazy(() => import("views/pages/authentication/authentication/Login")));

const AuthRoute = () => {
  const isAuthenticated = !!localStorage.getItem('tokenportalcredor');

  return isAuthenticated ? <Navigate to="/" /> : <AuthLogin />;
};

export default AuthRoute;

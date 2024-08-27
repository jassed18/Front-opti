// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom'; // Keep this import
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/auth" />;
};

export default PrivateRoute;

// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null
  });

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);

  const login = (userData) => {
    console.log('user',userData);
    const newAuthState = {
      isAuthenticated: true,
      user: {
        id: userData.id,
        email: userData.email
      },
      token: userData.token
    };
    setAuthState(newAuthState);
    localStorage.setItem('authState', JSON.stringify(newAuthState));
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
    localStorage.removeItem('authState');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };
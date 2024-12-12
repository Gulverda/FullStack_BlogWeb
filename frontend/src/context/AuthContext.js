import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token); 
    };

    checkLoginStatus(); 

    // Update state whenever the token changes in localStorage
    window.addEventListener('storage', () => {
      checkLoginStatus(); 
    });

    return () => {
      window.removeEventListener('storage', () => {
        checkLoginStatus(); 
      });
    };
  }, []); 

  const login = (token) => { 
    localStorage.setItem('authToken', token); 
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
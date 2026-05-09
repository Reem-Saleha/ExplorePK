import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('epk_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('epk_token');
      const storedUser = localStorage.getItem('epk_user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setCurrentUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = (token, user) => {
    localStorage.setItem('epk_token', token);
    localStorage.setItem('epk_user', JSON.stringify(user));
    setToken(token);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('epk_token');
    localStorage.removeItem('epk_user');
    setToken(null);
    setCurrentUser(null);
  };

  const isAdmin = () => currentUser?.role === 'admin';

  const isAuthenticated = () => !!token && !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout, isAdmin, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, adminRequired = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (adminRequired && !isAdmin()) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireInstructor = false }) {
  const { user, isAuthenticated, isInstructor } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireInstructor && !isInstructor) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

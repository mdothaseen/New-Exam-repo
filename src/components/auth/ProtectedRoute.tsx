
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Add console log for debugging authentication state
  console.log("Protected Route - Auth state:", { isAuthenticated, user, path: location.pathname });

  // Only redirect if not authenticated
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // The user is authenticated, render the protected route
  return <>{children}</>;
};

export default ProtectedRoute;

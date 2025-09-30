import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export const ProtectedRoute = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return null; 
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
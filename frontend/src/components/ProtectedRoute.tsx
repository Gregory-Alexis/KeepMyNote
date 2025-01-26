import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth_store';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

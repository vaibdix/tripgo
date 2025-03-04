import useAuthStore from '../store/authStore';
import { Navigate } from 'react-router-dom';

/**
 * Component that protects routes requiring admin privileges
 * Redirects to login page if user is not authenticated or not an admin
 */
const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.admin) {
    // If user is logged in but not an admin, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

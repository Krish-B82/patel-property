import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET_PATH || '/admin-login';

  if (!token) {
    // Not logged in - redirect to secret login page
    return <Navigate to={ADMIN_SECRET} replace />;
  }

  // Logged in - show the page
  return children;
};

export default ProtectedRoute;
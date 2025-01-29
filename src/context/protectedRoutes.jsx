import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = userAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      // Check if the user is already on the home page
      if (location.pathname !== '/') {
        // Redirect to the home page and pass state to open the login modal
        navigate('/', { state: { openLoginModal: true } });
      }
    }
  }, [user, navigate, location.pathname]);

  if (!user) {
    return null; // Prevent rendering the protected content
  }

  return children;
};

export default ProtectedRoute;

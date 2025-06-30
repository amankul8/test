
import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '~/modules/auth/hooks/auth';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

export default RequireAuth;
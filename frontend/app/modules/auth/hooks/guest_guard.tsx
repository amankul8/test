
import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '~/modules/auth/hooks/auth';

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default GuestGuard;
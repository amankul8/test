import React, { useState, useMemo, useCallback } from 'react';
import { AuthContext, type AuthContextType } from '../aut_context';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const login = useCallback((userData: { user: string, token: string }) => {
    setIsAuth(true);
    setUser(userData.user);
    setToken(userData.token);
  }, []);

  const logout = useCallback(() => {
    setIsAuth(false);
    setUser(null);
    setToken(null);
  }, []);

  const authContextValue = useMemo<AuthContextType>(() => ({
    isAuth,
    user,
    token,
    isLoading,
    login,
    logout,
  }), [isAuth, user, token, isLoading, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
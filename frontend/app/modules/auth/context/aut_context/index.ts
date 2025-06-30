// src/contexts/AuthContext.ts (или .tsx)
import { createContext } from 'react';

export type AuthContextType = {
  isAuth: boolean;
  user: string | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: { user: string, token: string }) => void;   
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  user: null,
  token: null,
  isLoading: false,
  login: () => {
    console.warn('Login function not provided by AuthProvider');
  },
  logout: () => {
    console.warn('Logout function not provided by AuthProvider');
  },
});
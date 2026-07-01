import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getMe } from '../api/auth';
import { clearTokens } from '../api/client';

interface AuthContextValue {
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  userName: string;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  userName: '',
  logout: () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  const refresh = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    try {
      const me = await getMe();
      setIsAuthenticated(true);
      setIsAdmin(me.role === 'ADMIN');
      setUserName(me.name);
    } catch {
      clearTokens();
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserName('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, loading, userName, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

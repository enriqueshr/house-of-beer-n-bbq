import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('hobb_admin_token'));
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('hobb_admin');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    setToken(data.token);
    setAdmin(data.admin);
    localStorage.setItem('hobb_admin_token', data.token);
    localStorage.setItem('hobb_admin', JSON.stringify(data.admin));
    return data;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('hobb_admin_token');
    localStorage.removeItem('hobb_admin');
  }, []);

  return (
    <AuthContext.Provider value={{ token, admin, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

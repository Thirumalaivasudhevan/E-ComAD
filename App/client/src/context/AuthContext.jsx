import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // 1. Check if we have a token in localStorage (fast check)
      const token = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');

      if (!token) {
        setLoading(false);
        return;
      }

      // 2. If we have a user in storage, set it immediately for perceived performance
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // 3. Verify with backend (secure check)
      const res = await api.get('/auth/me');
      setUser(res.data.user);

      // Update storage with fresh data
      localStorage.setItem('user', JSON.stringify(res.data.user));

    } catch (error) {
      console.error("Auth check failed:", error);
      // If verification fails, clear everything
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { user, accessToken, refreshToken } = res.data;

    // Save to LocalStorage for backward compatibility
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user);
    return user;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API result
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      // No need to set loading, instant redirect via ProtectedRoute
    }
  };

  const register = async (name, email, password) => {
    await api.post('/auth/register', { name, email, password });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


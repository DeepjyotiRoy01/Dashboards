import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../utils/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch current user data
  const fetchCurrentUser = async (token) => {
    try {
      const response = await authService.getCurrentUser();
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError('');
    try {
      const response = await authService.register(userData);
      setCurrentUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.msg || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(credentials);
      setCurrentUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.msg || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.patch('/api/auth/updateUser', userData);
      setCurrentUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.msg || 'Update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user password
  const updatePassword = async (passwordData) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.patch('/api/auth/updatePassword', passwordData);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.msg || 'Password update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
import { axiosWithFallback } from './apiClient';

// Login
export const login = async (email, password) => {
  try {
    const response = await axiosWithFallback('post', '/auth/login', {
      email,
      password,
    });
    
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminEmail', email);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminEmail');
  window.location.href = import.meta.env.VITE_ADMIN_SECRET_PATH || '/admin-login';
};

// Check if logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('adminToken');
};

// Get token
export const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Get admin email
export const getAdminEmail = () => {
  return localStorage.getItem('adminEmail');
};
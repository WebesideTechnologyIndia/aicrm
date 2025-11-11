import { create } from 'zustand';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,

  register: async (userData) => {
    set({ isLoading: true });
    try {
      const { data } = await authAPI.register(userData);
      
      toast.success('Registration successful! Please login.');
      set({ isLoading: false });
      return { success: true, data };
    } catch (error) {
      set({ isLoading: false });
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
      return { 
        success: false, 
        error: errorMessage
      };
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const { data } = await authAPI.login(credentials);
      
      const { token, user } = data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({
        user: user,
        token: token,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast.success(`Welcome back, ${user.name}!`);
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      return { 
        success: false, 
        error: errorMessage
      };
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
      
      toast.success('Logged out successfully');
    }
  },

  updateUser: (userData) => {
    const updatedUser = { ...useAuthStore.getState().user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  hasRole: (role) => {
    const { user } = useAuthStore.getState();
    return user?.role === role;
  },

  hasPermission: (permission) => {
    const { user } = useAuthStore.getState();
    return user?.permissions?.includes(permission) || false;
  },
}));

export default useAuthStore;
// src/services/api.js

import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ai-crm-api.webesidetechnology.com/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          toast.error('Session expired. Please login again.');
          break;
        case 403:
          toast.error('You do not have permission to perform this action.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(data?.message || 'Something went wrong.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  logout: () => api.post('/api/auth/logout'),
  getProfile: () => api.get('/api/auth/profile'),
  updateProfile: (data) => api.put('/api/auth/update-profile', data),
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/api/auth/reset-password', { token, password }),
};

export const usersAPI = {
  getAll: (params) => api.get('/api/users', { params }),
  getById: (id) => api.get(`/api/users/${id}`),
  create: (data) => api.post('/api/users/create', data),
  update: (id, data) => api.put(`/api/users/${id}`, data),
  delete: (id) => api.delete(`/api/users/${id}`),
  updatePermissions: (id, permissions) => api.put(`/api/users/${id}/permissions`, permissions),
};

export const teamsAPI = {
  getAll: (params) => api.get('/api/teams', { params }),
  getById: (id) => api.get(`/api/teams/${id}`),
  create: (data) => api.post('/api/teams/create', data),
  update: (id, data) => api.put(`/api/teams/update/${id}`, data),
  delete: (id) => api.delete(`/api/teams/delete/${id}`),
  addMember: (teamId, userId) => api.post(`/api/teams/${teamId}/members`, { userId }),
  removeMember: (teamId, userId) => api.delete(`/api/teams/${teamId}/members/${userId}`),
};

export const leadsAPI = {
  getAll: (params) => api.get('/api/leads', { params }),
  getById: (id) => api.get(`/api/leads/${id}`),
  create: (data) => api.post('/api/leads', data),
  update: (id, data) => api.put(`/api/leads/${id}`, data),
  delete: (id) => api.delete(`/api/leads/${id}`),
  import: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/leads/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  assign: (leadId, userId) => api.post(`/api/leads/${leadId}/assign`, { userId }),
  updateStage: (leadId, stage) => api.put(`/api/leads/${leadId}/stage`, { stage }),
  addNote: (leadId, note) => api.post(`/api/leads/${leadId}/notes`, { note }),
};

export const clientsAPI = {
  getAll: (params) => api.get('/api/clients', { params }),
  getById: (id) => api.get(`/api/clients/${id}`),
  create: (data) => api.post('/api/clients', data),
  update: (id, data) => api.put(`/api/clients/${id}`, data),
  delete: (id) => api.delete(`/api/clients/${id}`),
};

export const propertiesAPI = {
  getAll: (params) => api.get('/api/properties', { params }),
  getById: (id) => api.get(`/api/properties/${id}`),
  create: (data) => api.post('/api/properties', data),
  update: (id, data) => api.put(`/api/properties/${id}`, data),
  delete: (id) => api.delete(`/api/properties/${id}`),
  assignPartner: (propertyId, partnerId) => api.post(`/api/properties/${propertyId}/assign`, { partnerId }),
};

export const bookingsAPI = {
  getAll: (params) => api.get('/api/bookings', { params }),
  getById: (id) => api.get(`/api/bookings/${id}`),
  create: (data) => api.post('/api/bookings', data),
  update: (id, data) => api.put(`/api/bookings/${id}`, data),
  delete: (id) => api.delete(`/api/bookings/${id}`),
  addPayment: (bookingId, payment) => api.post(`/api/bookings/${bookingId}/payments`, payment),
};

export const dashboardAPI = {
  getStats: () => api.get('/api/dashboard/stats'),
  getAIHistory: (params) => api.get('/api/dashboard/ai-history', { params }),
  getAnalytics: (params) => api.get('/api/dashboard/analytics', { params }),
};

export const settingsAPI = {
  get: () => api.get('/api/settings'),
  updateCompany: (data) => api.put('/api/settings/company', data),
  updateNotifications: (data) => api.put('/api/settings/notifications', data),
  updateApiKeys: (data) => api.put('/api/settings/api-keys', data),
  updatePassword: (data) => api.put('/api/settings/password', data),
};
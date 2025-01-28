import axios from 'axios';
import { create } from 'zustand';

import { AuthStore } from '../models/AuthStore';

const AUTH_API_URL = 'http://localhost:5000/api/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  isAuthChecked: false,

  signup: async (username: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${AUTH_API_URL}/signup`, {
        username,
        email,
        password,
      });

      set({ isAuthenticated: true, user: response.data.user, isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error signing up';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null, user: null });
    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, {
        email,
        password,
      });

      set({ isAuthenticated: true, user: response.data.user, isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error signing up';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isAuthenticated: false, isLoading: true, error: null, user: null });
    try {
      await axios.post(`${AUTH_API_URL}/logout`);
      set({ isAuthenticated: false, user: null, isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error logging out';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isAuthChecked: false, error: null });
    try {
      const response = await axios.get(`${AUTH_API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isAuthChecked: true });
    } catch (error: any) {
      set({ error: null, isAuthChecked: false, isAuthenticated: false });
    }
  },
}));

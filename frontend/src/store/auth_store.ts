import axios from 'axios';

import { create } from 'zustand';
import { AuthStore } from '../models/AuthStore';

const API_URL = 'http://localhost:5173/api/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  isAuthChecked: true,

  signup: async (username: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
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
    set({ isAuthenticated: false, isLoading: true, error: null, user: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
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
    set({ isAuthenticated: true, isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ isAuthenticated: false, user: null, isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error logging out';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));

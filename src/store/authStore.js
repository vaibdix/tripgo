import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { api } from './Api';

const useAuthStore = create(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,

    login: async (credentials) => {
      try {
        const response = await api.login(credentials);
        const { token, user } = response.data;

        if (credentials.rememberMe) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }

        set({ user, isAuthenticated: true });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      set({ user: null, isAuthenticated: false });
    },

    checkAuth: () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      return !!token;
    },
  }))
);

export default useAuthStore;

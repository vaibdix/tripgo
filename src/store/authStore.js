import { api } from './Api';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Initialize state from storage outside the store
const getInitialState = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    try {
      const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      if (user) {
        // Make sure admin status is properly typed as boolean
        return {
          user: { ...user, admin: !!user.admin },
          isAuthenticated: true,
        };
      }
    } catch (e) {
      console.error('Error parsing user from storage:', e);
    }
  }
  return { user: null, isAuthenticated: false };
};

const initialState = getInitialState();

const useAuthStore = create(
  devtools((set) => ({
    user: initialState.user,
    isAuthenticated: initialState.isAuthenticated,

    login: async (credentials) => {
      try {
        const response = await api.login(credentials);
        const { token, user } = response.data;

        // Ensure admin is properly typed as boolean
        const userData = { ...user, admin: !!user.admin };

        if (credentials.rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(userData));
        }

        set({ user: userData, isAuthenticated: true });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      set({ user: null, isAuthenticated: false });
    },

    checkAuth: () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      return !!token;
    },

    initAuth: () => {
      // This function now just returns whether auth is already initialized
      // since we initialize on store creation
      return initialState.isAuthenticated;
    },
  }))
);

export default useAuthStore;

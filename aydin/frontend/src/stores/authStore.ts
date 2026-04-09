import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        try {
          const response = await authAPI.login(email, password);
          const { access_token, user } = response.data;
          set({ user, token: access_token });
          localStorage.setItem('token', access_token);
          toast.success('Logged in successfully');
        } catch (error) {
          toast.error('Login failed');
          throw error;
        }
      },
      register: async (email: string, password: string, interests: string[]) => {
        try {
          const response = await authAPI.register(email, password, interests);
          const { access_token, user } = response.data;
          set({ user, token: access_token });
          localStorage.setItem('token', access_token);
          toast.success('Registered successfully');
        } catch (error) {
          toast.error('Registration failed');
          throw error;
        }
      },
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
        toast.success('Logged out');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
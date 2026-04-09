import axios from 'axios';
import { Event } from '../types';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string, interests: string[]) =>
    api.post('/auth/register', { email, password, interests }),
};

export const eventsAPI = {
  getEvents: (params: any) => api.get('/events', { params }),
  getEvent: (id: string) => api.get(`/events/${id}`),
  saveEvent: (eventId: string) => api.post('/events/save', { eventId }),
  unsaveEvent: (eventId: string) => api.delete(`/events/save/${eventId}`),
  getSavedEvents: () => api.get('/events/saved'),
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
};

export default api;
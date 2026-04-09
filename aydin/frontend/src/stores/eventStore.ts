import { create } from 'zustand';
import { EventState, Event } from '../types';
import { eventsAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  savedEvents: [],
  loading: false,
  filters: {},
  page: 1,
  hasMore: true,
  fetchEvents: async (append = false) => {
    set({ loading: true });
    try {
      const { filters, page, events } = get();
      const params = {
        page: append ? page + 1 : 1,
        ...filters,
      };
      const response = await eventsAPI.getEvents(params);
      const newEvents = response.data;
      set({
        events: append ? [...events, ...newEvents] : newEvents,
        page: append ? page + 1 : 1,
        hasMore: newEvents.length > 0,
        loading: false,
      });
    } catch (error) {
      toast.error('Failed to fetch events');
      set({ loading: false });
    }
  },
  fetchSavedEvents: async () => {
    try {
      const response = await eventsAPI.getSavedEvents();
      set({ savedEvents: response.data });
    } catch (error) {
      toast.error('Failed to fetch saved events');
    }
  },
  saveEvent: async (eventId: string) => {
    try {
      await eventsAPI.saveEvent(eventId);
      toast.success('Event saved');
      get().fetchSavedEvents();
    } catch (error) {
      toast.error('Failed to save event');
    }
  },
  unsaveEvent: async (eventId: string) => {
    try {
      await eventsAPI.unsaveEvent(eventId);
      toast.success('Event unsaved');
      get().fetchSavedEvents();
    } catch (error) {
      toast.error('Failed to unsave event');
    }
  },
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters }, page: 1, hasMore: true });
    get().fetchEvents();
  },
  resetFilters: () => {
    set({ filters: {}, page: 1, hasMore: true });
    get().fetchEvents();
  },
}));
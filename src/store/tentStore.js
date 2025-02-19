import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { api } from './Api';

const useTentStore = create(
  devtools(
    (set) => ({
      tents: [],
      isLoading: false,
      error: null,
      fetchTents: async () => {
        set({ isLoading: true });
        try {
          const response = await api.fetchtents();
          set({ tents: response.data, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error fetching tents:', error);
        }
      },
    }),
    {
      name: 'Tent Store', // This name will appear in Redux DevTools
    }
  )
);

export default useTentStore;

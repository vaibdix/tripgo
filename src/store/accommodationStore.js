import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { api } from './Api';

const ITEMS_PER_PAGE = 12;

// Helper function moved outside the store
const applyFilters = (data, filters) => {
  let filteredData = data.filter((item) => {
    let matches = true;

    // Price Range Filter
    if (filters.priceRange) {
      const price = item.prices.afterDiscount;
      switch (filters.priceRange) {
        case 'Under ₹5,000':
          matches = matches && price < 5000;
          break;
        case '₹5,000 - ₹10,000':
          matches = matches && price >= 5000 && price <= 10000;
          break;
        case '₹10,000 - ₹15,000':
          matches = matches && price >= 10000 && price <= 15000;
          break;
        case 'Above ₹15,000':
          matches = matches && price > 15000;
          break;
      }
    }

    // Rating Filter
    if (filters.rating) {
      const rating = item.ratings.location || 0;
      matches = matches && rating >= parseFloat(filters.rating);
    }

    // Capacity Filter
    if (filters.capacity) {
      const capacity = item.capacity || 0;
      switch (filters.capacity) {
        case '1-2 Guests':
          matches = matches && capacity <= 2;
          break;
        case '3-4 Guests':
          matches = matches && capacity >= 3 && capacity <= 4;
          break;
        case '5-6 Guests':
          matches = matches && capacity >= 5 && capacity <= 6;
          break;
        case '7+ Guests':
          matches = matches && capacity >= 7;
          break;
      }
    }

    // Amenities Filter
    if (filters.amenities.length > 0) {
      matches = matches && filters.amenities.every((amenity) => item.amenities?.includes(amenity));
    }

    // Additional Filters
    if (filters.additionalFilters.length > 0) {
      matches =
        matches && filters.additionalFilters.every((filter) => item.features?.includes(filter));
    }

    return matches;
  });

  // Apply sorting
  if (filters.sortBy) {
    filteredData = [...filteredData].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_asc':
          return a.prices.afterDiscount - b.prices.afterDiscount;
        case 'price_desc':
          return b.prices.afterDiscount - a.prices.afterDiscount;
        case 'rating_desc':
          return b.ratings.location - a.ratings.location;
        case 'popular':
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
  }

  return filteredData;
};

const useAccommodationStore = create(
  devtools(
    (set, get) => ({
      accommodations: [],
      cachedData: {},
      isLoading: false,
      error: null,
      currentType: 'tents',
      currentPage: 1,
      totalPages: 1,

      fetchAccommodations: async (type, page = 1, filters = null) => {
        set({ isLoading: true, currentType: type, currentPage: page });

        try {
          // Check if data is in cache
          if (get().cachedData[type]) {
            let allData = get().cachedData[type];

            // Apply filters to cached data if they exist
            if (filters) {
              allData = applyFilters(allData, filters);
            }

            const paginatedData = allData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
            set({
              accommodations: paginatedData,
              totalPages: Math.ceil(allData.length / ITEMS_PER_PAGE),
              isLoading: false,
            });
            return;
          }

          // If not in cache, fetch from API
          let response;
          switch (type) {
            case 'tents':
              response = await api.fetchtents();
              break;
            case 'cottages':
              response = await api.fetchcottages();
              break;
            case 'farmhouses':
              response = await api.fetchfarmhouses();
              break;
            case 'hotels':
              response = await api.fetchhotels();
              break;
            case 'homestays':
              response = await api.fetchhomestays();
              break;
            case 'treehouses':
              response = await api.fetchtreehouses();
              break;
            case 'villas':
              response = await api.fetchvillas();
              break;
            default:
              response = await api.fetchtents();
          }

          let allData = response.data;

          // Cache the unfiltered data
          set((state) => ({
            cachedData: {
              ...state.cachedData,
              [type]: allData,
            },
          }));

          // Apply filters if they exist
          if (filters) {
            allData = applyFilters(allData, filters);
          }

          const paginatedData = allData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

          set({
            accommodations: paginatedData,
            totalPages: Math.ceil(allData.length / ITEMS_PER_PAGE),
            isLoading: false,
          });

          get().preloadNextCategory(type);
        } catch (error) {
          set({ error: error.message, isLoading: false });
          console.error(`Error fetching ${type}:`, error);
        }
      },

      changePage: (page) => {
        const { currentType, cachedData } = get();
        const allData = cachedData[currentType];
        const paginatedData = allData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
        set({
          accommodations: paginatedData,
          currentPage: page,
        });
      },

      preloadNextCategory: async (currentType) => {
        const categories = [
          'tents',
          'cottages',
          'farmhouses',
          'hotels',
          'homestays',
          'treehouses',
          'villas',
        ];
        const currentIndex = categories.indexOf(currentType);
        const nextType = categories[(currentIndex + 1) % categories.length];

        // If next category isn't cached, fetch it
        if (!get().cachedData[nextType]) {
          try {
            const response = await api[`fetch${nextType}`]();
            set((state) => ({
              cachedData: {
                ...state.cachedData,
                [nextType]: response.data,
              },
            }));
          } catch (error) {
            console.error(`Error preloading ${nextType}:`, error);
          }
        }
      },
    }),
    {
      name: 'Accommodation Store',
    }
  )
);

export default useAccommodationStore;

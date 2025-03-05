import { api } from './Api';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


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

// Add to existing store
const useAccommodationStore = create(
  devtools(
    (set, get) => ({
      accommodations: [],
      isLoading: false,
      error: null,
      currentType: 'tents',
      currentPage: 1,
      totalPages: 1,

      // Add users state
      users: [],
      usersLoading: false,
      usersError: null,

      // Fetch users function
      fetchUsers: async () => {
        set({ usersLoading: true });
        try {
          const response = await api.getallusers();
          // Ensure admin property is boolean for all users
          const users = response.data.map((user) => ({
            ...user,
            admin: !!user.admin,
          }));

          set(
            {
              users,
              usersLoading: false,
              usersError: null,
            },
            false,
            'fetchUsers'
          );
          return users;
        } catch (error) {
          set(
            {
              usersError: error.message,
              usersLoading: false,
            },
            false,
            'fetchUsersError'
          );
          console.error('Error fetching users:', error);
          return [];
        }
      },

      // Add user
      addUser: async (userData) => {
        set({ usersLoading: true });
        try {
          // Ensure admin is boolean before sending
          const dataToSend = {
            ...userData,
            admin: !!userData.admin,
          };

          const response = await api.addUser(dataToSend);
          // Ensure admin is boolean in the response
          const newUser = {
            ...response.data,
            admin: !!response.data.admin,
          };

          set((state) => ({
            users: [...state.users, newUser],
            usersLoading: false,
            usersError: null,
          }));
          return true;
        } catch (error) {
          set({
            usersError: error.message,
            usersLoading: false,
          });
          console.error('Error adding user:', error);
          return false;
        }
      },

      // Update user
      updateUser: async (userId, userData) => {
        set({ usersLoading: true });
        try {
          // Ensure admin is boolean before sending
          const dataToSend = {
            ...userData,
            admin: userData.admin !== undefined ? !!userData.admin : undefined,
          };

          const response = await api.updateUser(userId, dataToSend);
          // Ensure admin is boolean in the response
          const updatedUser = {
            ...response.data,
            admin: !!response.data.admin,
          };

          set((state) => ({
            users: state.users.map((user) =>
              user.id === userId || user._id === userId ? updatedUser : user
            ),
            usersLoading: false,
            usersError: null,
          }));
          return true;
        } catch (error) {
          set({
            usersError: error.message,
            usersLoading: false,
          });
          console.error('Error updating user:', error);
          return false;
        }
      },

      // Delete user
      deleteUser: async (userId) => {
        set({ usersLoading: true });
        try {
          await api.deleteUser(userId);
          set((state) => ({
            users: state.users.filter((user) => user.id !== userId && user._id !== userId),
            usersLoading: false,
            usersError: null,
          }));
          return true;
        } catch (error) {
          set({
            usersError: error.message,
            usersLoading: false,
          });
          console.error('Error deleting user:', error);
          return false;
        }
      },

      fetchAccommodations: async (type, page = 1, filters = null) => {
        set({ isLoading: true, currentType: type, currentPage: page });

        try {
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

          if (filters) {
            allData = applyFilters(allData, filters);
          }

          const paginatedData = allData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

          set(
            (state) => ({
              accommodations: paginatedData,
              totalPages: Math.ceil(allData.length / ITEMS_PER_PAGE),
              isLoading: false,
            }),
            false,
            'fetchAccommodations'
          ); // Add action name

          return allData;
        } catch (error) {
          set(
            (state) => ({
              error: error.message,
              isLoading: false,
            }),
            false,
            'fetchAccommodationsError'
          ); // Add action name
          console.error(`Error fetching ${type}:`, error);
          return [];
        }
      },

      changePage: async (page) => {
        const { currentType } = get();
        await get().fetchAccommodations(currentType, page);
      },

      getAccommodationById: async (id, type) => {
        try {
          console.log('Current type:', type);
          console.log('Searching for ID:', id);

          // First try to find in the specified type
          const response = await api[`fetch${type}`]();
          const allData = response.data;

          // Check for both _id and id
          const found = allData.find(
            (item) =>
              (item._id && item._id.toString() === id.toString()) ||
              (item.id && item.id.toString() === id.toString())
          );

          if (found) {
            console.log('Found in specified type:', type, found);
            return found;
          }

          console.log('Product not found in specified type, stopping search');
          return null;
        } catch (error) {
          console.error(`Error fetching accommodation by id:`, error);
          return null;
        }
      },
      // Initialize wishlist from localStorage
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],

      toggleWishlist: (item) => {
        set((state) => {
          const exists = state.wishlist.some((wishItem) => wishItem.id === item.id);
          const newWishlist = exists
            ? state.wishlist.filter((wishItem) => wishItem.id !== item.id)
            : [...state.wishlist, item];

          // Save to localStorage
          localStorage.setItem('wishlist', JSON.stringify(newWishlist));

          return { wishlist: newWishlist };
        });
      },

      isInWishlist: (id) => {
        const state = get();
        return state.wishlist.some((item) => item.id === id);
      },

      // Initialize cart from localStorage
      cart: JSON.parse(localStorage.getItem('cart')) || [],

      addToCart: (item) => {
        set((state) => {
          // Ensure item has all required properties
          const formattedItem = {
            id: item.id,
            campName: item.campName || 'Unnamed Camp',
            price: item.price || 0,
            actualPrice: item.actualPrice || 0,
            location: item.location || 'Unknown Location',
            images: item.images || [],
            type: item.type || 'unknown',
            ...item // Keep any additional properties
          };

          const existingItem = state.cart.find((cartItem) => cartItem.id === formattedItem.id);
          const newCart = existingItem
            ? state.cart.map((cartItem) =>
                cartItem.id === formattedItem.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
            : [...state.cart, { ...formattedItem, quantity: 1 }];

          // Save to localStorage
          localStorage.setItem('cart', JSON.stringify(newCart));

          return { cart: newCart };
        });
      },

      removeFromCart: (itemId) => {
        set((state) => {
          const newCart = state.cart.filter((item) => item.id !== itemId);
          // Save to localStorage
          localStorage.setItem('cart', JSON.stringify(newCart));
          return { cart: newCart };
        });
      },

      updateCartItemQuantity: (itemId, quantity) => {
        set((state) => {
          const newCart = state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          // Save to localStorage
          localStorage.setItem('cart', JSON.stringify(newCart));
          return { cart: newCart };
        });
      },

      clearCart: () => {
        // Clear both state and localStorage
        localStorage.removeItem('cart');
        set({ cart: [] });
      },

      getCartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => {
          // Handle both data structures (direct price and prices object)
          const price = item.prices?.afterDiscount || item.price || 0;
          return total + price * item.quantity;
        }, 0);
      },

      fetchcardAccommodations: async () => {
        set({ isLoading: true });
        try {
          // Fetch all types of accommodations
          const responses = await Promise.all([
            api.fetchtents(),
            api.fetchcottages(),
            api.fetchfarmhouses(),
            api.fetchhotels(),
            api.fetchtreehouses(),
            api.fetchhomestays(),
            api.fetchvillas(),
          ]);

          // Ensure each response has data and combine all data
          const allAccommodations = responses.reduce((acc, response) => {
            if (response && response.data) {
              return [...acc, ...response.data];
            }
            return acc;
          }, []);

          // Group accommodations by district
          const accommodationsByDistrict = allAccommodations.reduce((acc, item) => {
            if (item && item.address && item.address.dist) {
              const district = item.address.dist.toLowerCase();
              if (!acc[district]) {
                acc[district] = [];
              }
              acc[district].push(item);
            }
            return acc;
          }, {});

          set({ 
            accommodations: allAccommodations,
            accommodationsByDistrict,
            isLoading: false,
            error: null 
          });

          return accommodationsByDistrict;
        } catch (error) {
          console.error('Error fetching accommodations:', error);
          set({
            error: error.message || 'Failed to fetch accommodations',
            isLoading: false
          });
          return {};
        }
      },
    }),
    {
      name: 'Accommodation Store',
    }
  )
);

export default useAccommodationStore;
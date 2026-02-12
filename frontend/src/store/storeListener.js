// storeListeners.js
import { useAuthStore } from './useAuthStore';
import { useBookStore } from './useBookStore';

useAuthStore.subscribe(
  (state) => state.user,
  async (user) => {   
    if (user?.role === 'staff') {
      await useBookStore.getState().fetchStaffBookings();
    } else {
      useBookStore.setState({ bookings: [] });
    }
  }
);

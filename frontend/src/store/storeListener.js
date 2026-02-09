// storeListeners.js
import { useAuthStore } from './useAuthStore';
import { useBookStore } from './useBookStore';

useAuthStore.subscribe(
  (state) => state.user,
  (user) => {
    if (user?.role === 'staff') {
      useBookStore.getState().fetchStaffBookings();
    } else {
      useBookStore.setState({ bookings: [] });
    }
  }
);

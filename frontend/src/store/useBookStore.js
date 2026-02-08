import { create } from 'zustand';
import { api } from '../axios/api';
import { toast } from "react-toastify";

export const useBookStore = create((set) => ({
    bookings: [],
    isLoading: false,
    error: null,

    fetchBookings: async () => {
        set({ isLoading:true, error: null });
        try {
            const res = await api.get('/book');
            set({ bookings: res.data, isLoading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                isLoading: false
            })
        }
    },
    createBooking: async (bookingData) => {
        set({ isSubmitting: true });
        try {
            const res = await api.post('/book/bookings', bookingData);
            set((state) => ({ bookings: [...state.bookings, res.data], isSubmitting: false }));
            toast.success('Booking request sent successfully!');
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            set({ isSubmitting: false });
            throw error;
        }
    }
}));
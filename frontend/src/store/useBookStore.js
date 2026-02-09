import { create } from 'zustand';
import { api } from '../axios/api';
import { toast } from "react-toastify";

export const useBookStore = create((set) => ({
    bookings: [],
    isLoading: false,
    error: null,
    fetchStaffBookings: async() => {
       set({ isLoading:true, error: null });
        try {
            const res = await api.get('/book/staff');
            set({ bookings: res.data, isLoading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                isLoading: false
            })
        }       
    },
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
        set({ error:null, isLoading: true});
        try {
            const res = await api.post('/book/bookings', bookingData);
            set((state) => ({ bookings: [...state.bookings, res.data], isLoading: false }));
            toast.success('Booking request sent successfully!');
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            set({ isLoading: false });
            throw error;
        }
    },
    confirmBooking: async (id) => {
    set({ isLoading: true });

    try {
        const res = await api.patch(`book/bookings/${id}/confirm`);

        set((state) => ({
        bookings: state.bookings.map((b) =>
            b._id === id ? res.data : b
        ),
        isLoading: false,
        }));

        toast.success("Booking confirmed");
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        set({ isLoading: false });
    }
    },
    cancelBooking: async (id) => {
    set({ isLoading: true });

    try {
        const res = await api.patch(`book/bookings/${id}/cancel`);

        set((state) => ({
        bookings: state.bookings.map((b) =>
            b._id === id ? res.data : b
        ),
        isLoading: false,
        }));

        toast.success("Booking cancelled");
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        set({ isLoading: false });
    }
    },
          
}));
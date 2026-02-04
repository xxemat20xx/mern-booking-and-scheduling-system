import { create } from 'zustand';
import { api } from '../axios/api';

import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    register: async({name, email, password}) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/register', { name, email, password });
            set({ 
                user: response.data.user, 
                isAuthenticated: true, 
                isLoading: false,
                
            });
            toast.success("Registration successful, OTP was sent to your registered email")
        } catch (error) {
            toast.error(error.response?.data?.message || "Error signing up.")
            set({ isLoading:false})
        }
    },
    verifyOtp: async ({ email, otp }) => {
    set({ isLoading: true, error: null });
    try {
        const res = await api.post("auth/verify", { email, otp });
        toast.success(res.data.message || "Email verified successfully ✅");
        return res.data;
    } catch (error) {
        const message =
        error.response?.data?.message || "Invalid or expired OTP";
        set({ error: message });
        toast.error(message);
    } finally {
        set({ isLoading: false });
    }
    }

}))

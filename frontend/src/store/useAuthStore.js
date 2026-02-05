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
            toast.success("Registration successful, OTP was sent to your registered email");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error signing up.")
            set({ isLoading:false})
            throw error;
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
    },
    forgotPassword: async({ email }) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/forgot', { email });
            set({ user: response.data.user, isLoading: false});
            toast.success("Link was sent to your email address.")
        } catch (error) {
            set({ isLoading: false});
            toast.error("User not found.")
            throw error;
        }
    },
    login: async(email, password) => {
        set({ isLoading: true, error: null });
        try {
         const response = await api.post('/auth/login', { email, password });
         set({ 
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false
         })
         toast.success("Login successful.");
        } catch (err) {
        set({
            error: err.response?.data?.message || "Invalid email or password",
            isLoading: false,
            isAuthenticated: false
        });
         toast.error("Invalid email or password.");
        throw err;
        }
    },
    logout: async() => {
        set({ isLoading: true, error: null });
        try {
            await api.post('/auth/logout/');
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false });
        }
    },
    checkAuth: async() => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await api.get('/auth/check-auth');
            set({ 
                user: response.data.user, 
                isAuthenticated: true, 
                isCheckingAuth: false 
            });
        } catch (error) {
            set({ 
                error: null, 
                isAuthenticated: false, 
                isCheckingAuth: false 
            });
            console.error("checkAuth error:", error); 
        }
    }

}))

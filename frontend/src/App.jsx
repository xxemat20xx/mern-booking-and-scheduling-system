import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

import { useAuthStore } from "./store/useAuthStore";
import { useBookStore } from "./store/useBookStore";
import './store/storeListener';


import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, isCheckingAuth } = useAuthStore();

  // Wait for checkAuth to complete
  if (isCheckingAuth) return <div>Loading...</div>;

  // Redirect to login if not authenticated or not verified
  if (!isAuthenticated || !user?.isVerified) return <Navigate to="/login" replace />;

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <div>Loading...</div>;

  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;

  return children;
};

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  useEffect(() => {
  const unsubscribe = useAuthStore.subscribe(
    (user) => user,
    (user) => {
      if (user?.role === 'staff') {
        useBookStore.getState().fetchStaffBookings();
      } else {
        useBookStore.setState({ bookings: [] });
      }
    }
  );
  return () => unsubscribe();
}, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar>
                <Dashboard />
                <StaffDashboard />
              </Navbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;

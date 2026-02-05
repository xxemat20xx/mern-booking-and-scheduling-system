import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";

import Login from '../src/pages/Login'
import Dashboard from '../src/pages/Dashboard'
import ResetPassword from "./pages/ResetPassword";

import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated,isCheckingAuth } = useAuthStore();
  if(!user?.isVerified || !isAuthenticated) return <Login />
  if(isCheckingAuth) return <div>Loading...</div>
  return children;
};
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth} = useAuthStore();
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />
  if(isCheckingAuth) return <div>Loading...</div>
  return children;
};
const App = () => {
  
  const { checkAuth, } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

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
         <Route path="/" element={
          <ProtectedRoute>
              <Dashboard />
          </ProtectedRoute>
         }/>
        <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>}/>
        
        {/* PUBLIC route */}
        <Route path="/reset/:token" element={<ResetPassword />}/>
      </Routes>
     
    </>
  )
}

export default App
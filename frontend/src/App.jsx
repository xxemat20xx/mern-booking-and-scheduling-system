import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react";

import Login from '../src/pages/Login'
import Dashboard from '../src/pages/Dashboard'
import VerifyOtp from '../src/pages/VerifyOtp'
import Register from '../src/pages/Register'

import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated,isCheckingAuth } = useAuthStore();
  if(!user?.isVerified || !isAuthenticated) return <Login />
  if (user && user.isVerified === false) return <VerifyOtp />;
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
      <Routes>
         <Route path="/" element={
          <ProtectedRoute>
              <Dashboard />
          </ProtectedRoute>
         }/>

        <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>}/>
        <Route path="/register" element={<RedirectAuthenticatedUser><Register /></RedirectAuthenticatedUser>}/>
      </Routes>
    </>
  )
}

export default App
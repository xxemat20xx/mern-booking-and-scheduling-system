import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore'
import { LogOut, User as UserIcon, Shield } from 'lucide-react';
  const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Book Service', path: '/book' },

];
const Navbar = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const { logout, user} = useAuthStore();
  const handleLogout = async() =>{
    await logout();
  }
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <>
            <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md border-slate-200 py-3 shadow-sm'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
              BA
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Booking<span className="text-green-500">App</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900">{user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}</span>
              <span className="text-[10px] font-bold text-green-800 uppercase tracking-widest flex items-center gap-1">
                {user?.role === 'staff' ? <Shield size={10} /> : <UserIcon size={10} />}
                {user?.role || 'Client'}
              </span>
            </div>
              <button 
              onClick={() => handleLogout()}
              className='text-sm font-medium text-slate-600 hover:text-green-700 transition-colors duration-200'>
                 <div className='flex items-center justify-center gap-3'><span>Logout</span><LogOut size={18} /> </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    {/* main content */}
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      </>

  
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#products' },
  { label: 'Logout', }
];

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
              L
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Lumina<span className="text-indigo-600">UI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out transform ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        } bg-white border-b border-slate-200 shadow-xl`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-4 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <div className="pt-4 pb-2 border-t border-slate-100 space-y-3">
            <div className="px-3">
              <button className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl text-base font-semibold hover:bg-indigo-700 transition-all">
                Get Started
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

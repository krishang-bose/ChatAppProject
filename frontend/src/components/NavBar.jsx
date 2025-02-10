import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="w-full px-4 py-3 flex justify-between items-center 
        shadow-[0_4px_10px_rgba(128,0,128,0.3)] 
        border-b border-purple-900/30 
        transition-all duration-300 
        hover:shadow-[0_4px_15px_rgba(128,0,128,0.4)]">
      
        <div className="flex space-x-4">
          <Link 
            to="/about" 
            className="text-purple-400 hover:text-purple-100 
              transition-colors duration-300 
              hover:scale-105 
              text-md font-semibold"
          >
            About Us
          </Link>

          <Link 
            to="/contact" 
            className="text-purple-400 hover:text-purple-100 
              transition-colors duration-300 
              hover:scale-105 
              text-md font-semibold"
          >
            Contact
          </Link>
        </div>

        {authUser && (
          <button 
            onClick={logout}
            className="text-purple-400 hover:text-purple-100 
              transition-colors duration-300 
              hover:scale-105 
              text-md font-semibold">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
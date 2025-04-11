import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-black px-6 py-4 flex justify-between items-center border-b border-black">
      <div className="flex space-x-6">
        <a href="/about" className="text-purple-400 hover:text-purple-300">About Us</a>
        <a href="/contact" className="text-purple-400 hover:text-purple-300">Contact</a>
      </div>
      <div>
        <a href="/logout" className="text-purple-400 hover:text-purple-300">Logout</a>
      </div>
    </div>
  );
};

export default Navbar;
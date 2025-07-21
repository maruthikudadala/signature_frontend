import React from 'react';
import { Menu, X } from "lucide-react"; 
import { Search } from 'lucide-react';

function Navbar({ showRegisterHandler, showLoginHandler }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-auto w-full px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/support1.png"
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="text-xl font-bold text-gray-800">HelpDesk</span>
      </div>

      {/* Search Bar */}
      <div className=" lg:flex flex-grow justify-center px-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mt-4 lg:mt-0">
        <a
          href="#home"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          About
        </a>
        <button
          onClick={showRegisterHandler}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Signup
        </button>
        <button
          onClick={showLoginHandler}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

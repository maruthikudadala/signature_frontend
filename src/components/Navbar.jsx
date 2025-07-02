import React from 'react';
import { Search } from 'lucide-react';

function Navbar({ showRegisterHandler, showLoginHandler }) {
  return (
    //<nav className="fixed top-0 left-0 right-0 z-[1041] bg-lightblack shadow-md h-[60px] w-full px-6 flex items-center justify-between">
    <nav className="fixed top-0 left-0 right-0 z-[1041] bg-[#f5f5fa] shadow-md h-[100px] w-full px-6 flex items-center justify-between">

      
      {/* Logo */}
      <div className="flex items-center w-[150px]">
        <img
          src="/support1.png"
          alt="Logo"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
      </div>

      {/* Search Bar (center aligned by flex-grow + margin) */}
      <div className="flex items-center justify-center flex-grow ml-[150px]">
        <div className="flex items-center w-[600px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-[400px] h-[40px] px-4 pl-10 text-[16px] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="ml-2 text-gray-500 border p-2 rounded-full h-[40px] w-[40px] cursor-pointer hover:text-blue-500" />
        </div>
      </div>

      {/* Right-side Actions */}
      {/* <div className="nav-actions flex items-center h-full w-[420px] space-x-4 ml-auto text-[14px] leading-[18px] gap-20"> */}
      <div className="nav-actions flex items-center h-full w-[420px] ml-auto text-[18px] leading-[18px]  gap-20">
        <a
          href="#home"
          className="text-gray-700 hover:text-blue-600 no-underline pl-[10px]"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-gray-700 hover:text-blue-600 no-underline pl-[50px]"
        >
          About
        </a>

        {/* Signup Button */}
        <a
          href="#signup"
          onClick={showRegisterHandler}
          className="btn text-white bg-[#e5322d] hover:bg-red-600 text-[18px] leading-[26px] font-semibold rounded-[8px] px-[20px] py-[8px] no-underline ml-[50px]"
        >
          Signup
        </a>

        {/* Login Button */}
        <a
          href="#login"
          onClick={showLoginHandler}
          className="btn text-white bg-[#28a745] hover:bg-green-600 text-[18px] leading-[26px] font-semibold rounded-[8px] px-[20px] py-[8px] no-underline ml-[30px]"
        >
          Login
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

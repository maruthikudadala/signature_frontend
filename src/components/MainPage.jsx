import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import UploadPdfFlow from "./UploadPdfFlow";
import UploadAndSign from "./UploadAndSign";
import Dashboard from "./Dashboard";

function MainPage({ showNavbarOnlyHandler }) {
  const [view, setView] = useState("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUploadSuccess = () => {
    setView("dashboard");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-400   shadow-lg h-[80px] w-full px-4 md:px-8 flex items-center justify-between text-black">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/support1.png"
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover mr-2"
          />
          <h1 className="font-bold text-xl hidden sm:block">DocuSign Clone</h1>
        </div>

        {/* Search */}
        <div className=" md:flex items-center justify-center flex-grow mx-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-full text-gray-800 focus:ring-2 focus:ring-white outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className=" md:flex items-center gap-6">
          <button
            onClick={() => setView("upload")}
            className="hover:text-yellow-200 transition"
          >
            Upload PDF
          </button>
          <button
            onClick={() => setView("dashboard")}
            className="hover:text-yellow-200 transition"
          >
            Document View
          </button>
          <button
            onClick={showNavbarOnlyHandler}
            className="hover:text-yellow-200 transition"
          >
            Home
          </button>
        </div>

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black py-4 px-6 shadow-md absolute top-20 w-full z-40 space-y-3">
          <button
            onClick={() => {
              setView("upload");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left"
          >
            Upload PDF
          </button>
          <button
            onClick={() => {
              setView("dashboard");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left"
          >
            Document View
          </button>
          <button
            onClick={() => {
              showNavbarOnlyHandler();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left"
          >
            Home
          </button>
        </div>
      )}

      {/* Page Content */}
      <div className="pt-[100px] px-4 sm:px-8">
        {view === "upload" && <UploadPdfFlow />}
        {view === "dashboard" && <Dashboard />}
        {view === "default" && (
          <div className="flex justify-center items-center h-[calc(100vh-100px)]">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
              Welcome! Upload a PDF to sign.
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default MainPage;

import React, { useState } from "react";
import Register from "../components/forms/Register";
import Navbar from "../components/Navbar";
import Login from "../components/forms/Login";
import MainPage from "../components/MainPage";

const LandingPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMainPage, setMainPage] = useState(false);

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setMainPage(false);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setMainPage(false);
  };

  const showMainPageHandler = () => {
    setMainPage(true);
    setShowRegister(false);
    setShowLogin(false);
  };

  const showNavbarOnlyHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setMainPage(false);
  };

  return (
    <>
      <section className="landingSection min-h-screen bg-gradient-to-br from-indigo-100 to-white">
        {/* Show Navbar only if not on MainPage */}
        {!showMainPage && (
          <Navbar
            showRegisterHandler={showRegisterHandler}
            showLoginHandler={showLoginHandler}
          />
        )}

        {/* Views */}
        <div className="flex flex-col items-center justify-center p-4">
          {showRegister && (
            <div className="w-full shadow-lg rounded-xl  mt-6">
              <Register showLoginHandler={showLoginHandler} />
            </div>
          )}
          {showLogin && (
            <div className="w-full shadow-lg rounded-xl  mt-6">
              <Login showMainPageHandler={showMainPageHandler} />
            </div>
          )}
          {showMainPage && (
            <MainPage showNavbarOnlyHandler={showNavbarOnlyHandler} />
          )}

          {/* Welcome screen */}
          {!showRegister && !showLogin && !showMainPage && (
            <div className="flex justify-center items-center h-[calc(100vh-100px)] w-full">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center p-4">
                Welcome to Signature App
              </h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LandingPage;

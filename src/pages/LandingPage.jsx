// import React,{useState} from "react";

// import Register from "../components/forms/Register";
// import Navbar from "../components/Navbar";
// import Login from "../components/forms/Login";
// import MainPage from "../components/MainPage";


// const LandingPage = ()=>{
//     const [showRegister, setShowRegister] = useState(false)
//     const [showLogin, setShowLogin] = useState(false)
//     const [showMainPage,setMainPage] =useState(false)

// const showRegisterHandler=()=>{
//     setShowRegister(true)
//     setShowLogin(false)
//     setMainPage(false)
// }
// const showLoginHandler= ()=>{
//     setShowLogin(true)
//     setShowRegister(false)
//     setMainPage(false)
// }
// const showMainPageHandler=()=>{
//     setMainPage(true)
//     setShowRegister(false)
//     setShowLogin(false)
// }
// //after clicking home page on mainpage ,it comes return back to landing page(homepage)
// const showNavbarOnlyHandler = () => {
//     setShowRegister(false);
//     setShowLogin(false);
//     setMainPage(false);  // This will hide MainPage and only show Navbar
//   };
  

//     return(
//         <>
//         <section className="landingSection">
//             {/* <Navbar showRegisterHandler={showRegisterHandler} showLoginHandler={showLoginHandler}/> */}
//     {/* Only show Navbar when not on MainPage */}
//       {!showMainPage && (
//         <Navbar
//           showRegisterHandler={showRegisterHandler}
//           showLoginHandler={showLoginHandler}
//         />
//       )}

//             {showRegister && <Register showLoginHandler={showLoginHandler}/>} {/* after registration , login page chopinchali */}
//             {showLogin && <Login showMainPageHandler ={showMainPageHandler}/>}
//             {showMainPage && <MainPage showNavbarOnlyHandler={showNavbarOnlyHandler}/> }
//         </section>
       
//         </>
//     )
// }
// export default LandingPage


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

  // After clicking home on mainpage, return back to landing page
  const showNavbarOnlyHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setMainPage(false); // This will hide MainPage and only show Navbar
  };

  return (
    <>
      <section className="landingSection min-h-screen">
        {/* Show Navbar only if not on MainPage */}
        {!showMainPage && (
          <Navbar
            showRegisterHandler={showRegisterHandler}
            showLoginHandler={showLoginHandler}
          />
        )}

        {/* Views */}
        {showRegister && <Register showLoginHandler={showLoginHandler} />}
        {showLogin && <Login showMainPageHandler={showMainPageHandler} />}
        {showMainPage && <MainPage showNavbarOnlyHandler={showNavbarOnlyHandler} />}

        {/* Show Welcome Message if nothing else is visible */}
        {!showRegister && !showLogin && !showMainPage && (
          <div className="flex justify-center items-center h-[calc(100vh-100px)]">
            <h1 className="text-3xl font-bold text-gray-700">Welcome to Signature App</h1>
          </div>
        )}
      </section>
    </>
  );
};

export default LandingPage;

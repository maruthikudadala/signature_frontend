

// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import UploadPdfFlow from './UploadPdfFlow';
// import UploadAndSign from './UploadAndSign';
// import Dashboard from './Dashboard';

// function MainPage({ showNavbarOnlyHandler }) {
//   const [view, setView] = useState("default");

//   const handleUploadSuccess = () => {
//     setView("dashboard");
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 right-0 z-[1041] bg-[#f5f5fa] shadow-md h-[100px] w-full px-6 flex items-center justify-between">

//         {/* Logo */}
//         <div className="flex items-center w-[150px]">
//           <img
//             src="/support1.png"
//             alt="Logo"
//             className="w-[50px] h-[50px] rounded-full object-cover"
//           />
//         </div>

//         {/* Search Bar */}
//         <div className="flex items-center justify-center flex-grow ml-[150px]">
//           <div className="flex items-center w-[600px]">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-[400px] h-[40px] px-4 pl-10 text-[16px] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <Search className="ml-2 text-gray-500 border p-2 rounded-full h-[40px] w-[40px] cursor-pointer hover:text-blue-500" />
//           </div>
//         </div>

//        {/* Right-Side Nav Actions */}
//        <div className="nav-actions flex items-center h-full w-[420px] ml-auto text-[18px] leading-[18px] gap-10">
//   <button
//     onClick={() => setView("upload")}
//     className="text-gray-700 hover:text-green-600 text-[18px] pl-[10px] bg-transparent border-none focus:outline-none cursor-pointer"
//   >
//     Upload PDF
//   </button>
//   <button
//     onClick={() => setView("dashboard")}
//     className="text-gray-700 hover:text-yellow-600 text-[18px] pl-[10px] bg-transparent border-none focus:outline-none cursor-pointer"
//   >
//     Document View
//   </button>
//   <button
//     onClick={showNavbarOnlyHandler}
//     className="text-gray-700 hover:text-white-600 text-[18px] pl-[10px] bg-transparent border-none focus:outline-none cursor-pointer"
//   >
//     Home
//   </button>
// </div>


//       </nav>

//       {/* Push content down below navbar */}
//       <div className="pt-[120px] px-6">
//         {/* {view === "upload" && <UploadAndSign onUploadSuccess={handleUploadSuccess} />} */}
//         {view === "upload" && <UploadPdfFlow />}
//         {view === "dashboard" && <Dashboard />}
//       </div>
//     </>
//   );
// }

// export default MainPage;


import React, { useState } from 'react';
import { Search } from 'lucide-react';
import UploadPdfFlow from './UploadPdfFlow';
import UploadAndSign from './UploadAndSign';
import Dashboard from './Dashboard';

function MainPage({ showNavbarOnlyHandler }) {
  const [view, setView] = useState("default");

  const handleUploadSuccess = () => {
    setView("dashboard");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[1041] bg-[#f5f5fa] shadow-md h-[100px] w-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center w-[150px]">
          <img
            src="/support1.png"
            alt="Logo"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>

        {/* Search Bar */}
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

        {/* Right-Side Nav Actions */}
        <div className="nav-actions flex items-center h-full w-[420px] ml-auto text-[18px] leading-[18px] gap-10">
          <button
            onClick={() => setView("upload")}
            className="text-gray-700 hover:text-green-600 text-[18px] pl-[10px] bg-transparent border-none focus:outline-none cursor-pointer"
          >
            Upload PDF
          </button>
          <button
            onClick={() => setView("dashboard")}
            className="text-gray-700 hover:text-yellow-600 text-[18px] pl-[10px] bg-transparent border-none focus:outline-none cursor-pointer"
          >
            Document View
          </button>
          <button
            onClick={showNavbarOnlyHandler}
            className="text-gray-700 hover:text-blue-600 text-[18px] pl-[10px] bg-transparent border-none focus:outline-none cursor-pointer"
          >
            Home
          </button>
        </div>
      </nav>

      {/* Push content down below navbar */}
      <div className="pt-[120px] px-6">
        {view === "upload" && <UploadPdfFlow />}
        {view === "dashboard" && <Dashboard />}

        {/* 👇 Centered Welcome Message When No View Selected */}
        {view === "default" && (
          <div className="flex justify-center items-center h-[calc(100vh-120px)]">
            <h1 className="text-3xl font-bold text-gray-700 text-center">
              Welcome! Upload a PDF to sign
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default MainPage;

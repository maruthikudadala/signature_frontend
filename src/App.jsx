import React from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
         <Route path="/dashboard" element={ <Dashboard/>} /> 
       
        
      </Routes>
      
      
    </div>
  );
}

export default App;

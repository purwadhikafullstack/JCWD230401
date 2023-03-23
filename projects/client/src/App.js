import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./Pages/Landing";
import NavbarMobile from "./Components/NavbarMobile";
import Navbar from "./Components/Navbar";
import React from "react";
import Footer from "./Components/Footer";
import UserRegister from "./Pages/UserRegister";


function App() {
  const location = useLocation();



  return (
<>
      {location.pathname === "/" && <Navbar />}
      {location.pathname === "/" && <Footer />}
      <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/userregister" element={<UserRegister />} />
      </Routes>
      {location.pathname === "/" && <NavbarMobile />}
    </>
  );
}

export default App;

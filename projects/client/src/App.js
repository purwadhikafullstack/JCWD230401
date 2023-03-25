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
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./reducers/auth";
import { API_URL } from "./helper";
import ChangePassword from "./Pages/ChangePassword";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  // const roleId = useSelector((state) => state.authReducer.roleId);

  const keeplogin = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      if (token) {
        let response = await axios.get(`${API_URL}/user/keeplogin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("ini respon dari keeplogin :", response.data);
        localStorage.setItem("tempatku_login", response.data.token);
        dispatch(loginAction(response.data));
      }
    } catch (error) {
      console.log("ini error dari keeplogin : ", error);
    }
  };

  React.useEffect(() => {
    keeplogin();
  }, []);

  return (
<>
{/* blm dikasi boundaries login sesuai roleI bisa akses apa */}
      {location.pathname === "/" && <Navbar />}
      {location.pathname === "/" && <Footer />}
      <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/userregister" element={<UserRegister />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Routes>
      {location.pathname === "/" && <NavbarMobile />}
    </>
  );
}

export default App;

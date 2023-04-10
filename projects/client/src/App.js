import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavbarMobile from "./Components/NavbarMobile";
import Navbar from "./Components/Navbar";
import React from "react";
import UserRegister from "./Pages/UserRegister";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./reducers/auth";
import { API_URL } from "./helper";
import ChangePassword from "./Pages/ChangePassword";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Landing from "./Pages/Landing/Landing";
import FilteredProperty from "./Pages/FilteredProperty/FilteredProperty";
import PropertyDetail from "./Pages/PropertyDetail/PropertyDetail";
import Payments from "./Pages/Payments/Payments";
import PaymentDetail from "./Pages/PaymentDetail";

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
      {/* {location.pathname === "/" && <Navbar />} */}
      {
        !location.pathname.includes('auth') ?
          <>
            <Navbar />
            <NavbarMobile />
          </>
          :
          null
      }
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/auth/changepassword" element={<ChangePassword />} />
        <Route path="/auth/userregister" element={<UserRegister />} />
        <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="/auth/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/" element={<Landing />} />
        <Route path="/property" element={<FilteredProperty />} />
        <Route path="/property/detail/:uuid" element={<PropertyDetail />} />
        <Route path="/payment" element={<Payments />} />
        <Route path="/payment/detail" element={<PaymentDetail />} />
      </Routes>
      {/* {location.pathname === "/" && <NavbarMobile />} */}
    </>
  );
}

export default App;

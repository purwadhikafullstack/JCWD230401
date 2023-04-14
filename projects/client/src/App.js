import axios from "axios";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavbarMobile from "./Components/NavbarMobile";
import Navbar from "./Components/Navbar";
import React, { useState } from "react";
import UserRegister from "./Pages/UserRegister";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./reducers/auth";
import { API_URL } from "./helper";
import ChangePassword from "./Pages/ChangePassword";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Landing from "./Pages/Landing/Landing";
import TenantRegister from "./Pages/TenantRegister";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NotFound from "./Pages/NotFound";
import Verification from "./Pages/Verification";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import TransactionPage from "./Pages/TransactionPage";
import FilteredProperty from "./Pages/FilteredProperty/FilteredProperty";
import PropertyDetail from "./Pages/PropertyDetail/PropertyDetail";
import EditProfile from "./Pages/EditProfile";
import TenantCalendar from "./Pages/TenantCalendar";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const roleId = useSelector((state) => state.authReducer.roleId);
  // console.log("ini isi roleId dari useSelector di App.js : ", roleId);

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
      {location.pathname === "/" && <Navbar />}
      {location.pathname === "/editprofile" && <Navbar />}
      {location.pathname === "/productdetail" && <Navbar />}
      {location.pathname === "/transactionpage" && <Navbar />}
      {location.pathname === "/dashboard" && roleId == 2 && <Navbar />}
      {location.pathname === "/tenantcalendar" && roleId == 2 && <Navbar />}

      {
        // User
        roleId == 1 ? (
          <Routes>
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/userregister" element={<UserRegister />} />
            <Route path="/tenantregister" element={<TenantRegister />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/verifyaccount/:token" element={<Verification />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/productdetail" element={<ProductDetail />} />
            <Route path="/transactionpage" element={<TransactionPage />} />
            <Route path="/editprofile" element={<EditProfile keeplogin={() => dispatch(keeplogin())} />} />
            <Route path="/property" element={<FilteredProperty />} />
            <Route path="/property/detail/:uuid" element={<PropertyDetail />} />
          </Routes>
        ) : // Tenant
          roleId == 2 ? (
            <Routes>
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/userregister" element={<UserRegister />} />
              <Route path="/tenantregister" element={<TenantRegister />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/verifyaccount/:token" element={<Verification />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/property/detail/:uuid" element={<PropertyDetail />} />
              <Route path="/tenantcalendar" element={<TenantCalendar />} />
              <Route path="/editprofile" element={<EditProfile keeplogin={() => dispatch(keeplogin())} />} />
            </Routes>
          ) : (
            // Not logged in
            <Routes>
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/userregister" element={<UserRegister />} />
              <Route path="/tenantregister" element={<TenantRegister />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/verifyaccount/:token" element={<Verification />} />
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/property" element={<FilteredProperty />} />
              <Route path="/property/detail/:uuid" element={<PropertyDetail />} />
            </Routes>
          )
      }
      {location.pathname === "/" && <NavbarMobile />}
    </>
  );
}

export default App;

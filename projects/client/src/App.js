import axios from "axios";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavbarMobile from "./Components/NavbarMobile";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import React from "react";
import UserRegister from "./Pages/UserRegister";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./reducers/auth";
import { API_URL } from "./helper";
import ChangePassword from "./Pages/ChangePassword";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Landing from "./Pages/Landing/Landing";
import TenantRegister from "./Pages/TenantRegister";
import TenantDashboard from "./Pages/TenantDashboard/TenantDashboard";
import NotFound from "./Pages/NotFound";
import Verification from "./Pages/Verification";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import TransactionPage from "./Pages/TransactionPage";
import EditProfile from "./Pages/EditProfile";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.authReducer.role);
  console.log("ini isi role dari useSelector di App.js : ", role);
  //bikin aja kalo useSelector passwordnya NULL brarti keeplogin gausa dia pake cookie aja 
  const password = useSelector((state) => state.authReducer.password);

  const keeplogin = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      if (token) {
        let response = await axios.get(`${API_URL}/user/keeplogin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("ini respon dari keeplogin :", response.data);
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
      {/* {location.pathname === "/" && <Navbar />}
      {location.pathname === "/editprofile" && <Navbar />}
      {location.pathname === "/dashboard" && role == "Tenant" && <Navbar />}
      {location.pathname === "/changepassword" && <Navbar />} */}
      <Navbar />
      
      {
        // User
        role == "User" ? (
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
            <Route
              path="/editprofile"
              element={<EditProfile keeplogin={() => dispatch(keeplogin())} />}
            />
          </Routes>
        ) : // Tenant
        role == "Tenant" ? (
          <Routes>
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/userregister" element={<UserRegister />} />
            <Route path="/tenantregister" element={<TenantRegister />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/verifyaccount/:token" element={<Verification />} />
            <Route path="/dashboard" element={<TenantDashboard />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/productdetail" element={<ProductDetail />} />
            <Route
              path="/editprofile"
              element={<EditProfile keeplogin={() => dispatch(keeplogin())} />}
            />
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
            <Route path="/productdetail" element={<ProductDetail />} />
          </Routes>
        )
      }
      {/* {location.pathname === "/" && <NavbarMobile />} */}
      <Footer />
    </>
  );
}

export default App;

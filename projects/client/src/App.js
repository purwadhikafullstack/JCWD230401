import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
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
  const dispatch = useDispatch();
  const role = useSelector((state) => state.authReducer.role);

  const keepLogin = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      if (token) {
        let response = await axios.get(`${API_URL}/user/keep-login`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem("tempatku_login", response.data.token);
        dispatch(loginAction(response.data));
      }
    } catch (error) {
      console.log("ini error dari keeplogin : ", error);
    }
  };

  React.useEffect(() => {
    keepLogin();
  }, []);

  return (
    <>
      <Navbar />
      {
        // User
        role == "User" ? (
          <Routes>
            <Route path="/password/change" element={<ChangePassword />} />
            <Route path="/register/user" element={<UserRegister />} />
            <Route path="/register/tenant" element={<TenantRegister />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route
              path="/account/verification/:token"
              element={<Verification />}
            />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/productdetail" element={<ProductDetail />} />{" "}
            {/* TESTING, DELETE LATER */}
            <Route path="/transactionpage" element={<TransactionPage />} />{" "}
            {/* TESTING, DELETE LATER */}
            <Route
              path="/profile/edit"
              element={<EditProfile keepLogin={() => dispatch(keepLogin())} />}
            />
          </Routes>
        ) : // Tenant
        role == "Tenant" ? (
          <Routes>
            <Route path="/password/change" element={<ChangePassword />} />
            <Route path="/register/tenant" element={<TenantRegister />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={<TenantDashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/profile/edit"
              element={<EditProfile keepLogin={() => dispatch(keepLogin())} />}
            />
          </Routes>
        ) : (
          // Not logged in
          <Routes>
            <Route path="/password/change" element={<ChangePassword />} />
            <Route path="/register/user" element={<UserRegister />} />
            <Route path="/register/tenant" element={<TenantRegister />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route
              path="/account/verification/:token"
              element={<Verification />}
            />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/productdetail" element={<ProductDetail />} />{" "}
            {/* TESTING, DELETE LATER */}
          </Routes>
        )
      }
      <Footer />
    </>
  );
}

export default App;

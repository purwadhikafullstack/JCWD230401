import axios from "axios";
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
import AddProperty from "./Pages/Tenant/AddProperty";
import ManageProperty from "./Pages/Tenant/ManageProperty";
import AddRoom from "./Pages/Tenant/AddRoom";
import ManageRoom from "./Pages/Tenant/ManageRoom";
import PropertyList from "./Pages/Tenant/PropertyList";
import RoomList from "./Pages/Tenant/RoomList";
import RoomConditionList from "./Pages/Tenant/RoomConditionList";
import SalesReport from "./Components/SalesReport";

function App(props) {
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
            {/* blm dikasi boundaries login sesuai roleID bisa akses apa */}
            {/* {location.pathname === "/" && <Navbar />} */}
            {!location.pathname.includes("auth") ? (
                <>
                    <Navbar />
                    <NavbarMobile />
                </>
            ) : null}

            <Routes>
                {/* <Route path="/" element={<Landing />} /> */}
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/userregister" element={<UserRegister />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route
                    path="/resetpassword/:token"
                    element={<ResetPassword />}
                />
                <Route path="/" element={<Landing />} />
                <Route path="/listing" element={<AddProperty />} />
                <Route path="/editlisting/:uuid" element={<ManageProperty />} />
                <Route path="/room" element={<AddRoom />} />
                <Route path="/editroom/:uuid" element={<ManageRoom />} />
                <Route path="/propertylist" element={<PropertyList />} />
                <Route path="/roomlist/:uuid" element={<RoomList />} />
                <Route
                    path="/specialconditions/:uuid"
                    element={<RoomConditionList />}
                />
                <Route path="/report" element={<SalesReport/>}/>
            </Routes>
            {location.pathname === "/" && <NavbarMobile />}
        </>
    );
}

export default App;

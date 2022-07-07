import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/contexts";
import { IAuthContext } from "./interfaces";
import NotFound from "./pages/404/404";
import Main from "./pages/Admin/Main/Main";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import NavBar from "./pages/common/NavBar";
import Public from "./pages/public/Public/Public";
import PrivateAdminRoute from "./pages/secret-routes/PrivateAdminRoute";
import PrivateUserRoute from "./pages/secret-routes/PrivateUserRoute";
import Home from "./pages/User/Home/Home";

export default function App() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        let clean = true;

        if (authCtx.isAuthenticated && authCtx.user?.role === "admin") {
            navigate("/admin/home");
        }
        if (authCtx.isAuthenticated && authCtx.user?.role === "user") {
            navigate("/user/home");
        }

        if (clean) {
            return () => {
                clean = false;
            };
        }
    }, [authCtx.isAuthenticated]);

    React.useEffect(() => {
        let clean = true;

        authCtx.validateToken();

        return () => {
            clean = false;
        };
    }, []);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Public />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/admin" element={<PrivateAdminRoute />}>
                    <Route path="/admin/home" element={<Main />} />
                </Route>
                <Route path="/user" element={<PrivateUserRoute />}>
                    <Route path="/user/home" element={<Home />} />
                </Route>
            </Routes>
        </>
    );
}

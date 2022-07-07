import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { AuthContext } from "./context/contexts";
import { IAuthContext } from "./interfaces";
import NotFound from "./pages/404/404";
import AddBus from "./pages/Admin/Bus/AddBus/AddBus";
import AddLocation from "./pages/Admin/Loc/AddLocation/AddLocation";
import Locations from "./pages/Admin/Loc/Locations/Locations";
import Main from "./pages/Admin/Main/Main";
import UpdateLocation from "./pages/Admin/Loc/UpdateLocation/UpdateLocatiob";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import NavBar from "./pages/common/NavBar";
import Public from "./pages/public/Public/Public";
import AuthRoute from "./pages/secret-routes/AuthRoute";
import PrivateAdminRoute from "./pages/secret-routes/PrivateAdminRoute";
import PrivateUserRoute from "./pages/secret-routes/PrivateUserRoute";
import Home from "./pages/User/Home/Home";

export default function App() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        let clean = true;

        if (authCtx.isAuthenticated && authCtx.user?.role === "admin") {
            navigate("/admin/");
        }
        if (authCtx.isAuthenticated && authCtx.user?.role === "user") {
            navigate("/user/");
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
            authCtx.clean();
            clean = false;
        };
    }, []);

    if (authCtx.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Public />} />

                <Route path="/" element={<AuthRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/admin" element={<PrivateAdminRoute />}>
                    <Route path="/admin/" element={<Main />} />
                    <Route path="/admin/add-bus" element={<AddBus />} />
                    <Route path="/admin/locations" element={<Locations />} />
                    <Route
                        path="/admin/edit-location/:id"
                        element={<UpdateLocation />}
                    />
                    <Route
                        path="/admin/add-location"
                        element={<AddLocation />}
                    />
                </Route>
                <Route path="/user" element={<PrivateUserRoute />}>
                    <Route path="/user/" element={<Home />} />
                </Route>
            </Routes>
        </>
    );
}

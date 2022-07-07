import React from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/contexts";
import { IAuthContext } from "../../interfaces/index";
import Login from "../Auth/Login/Login";

export default function PrivateAdminRoute() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);
    return authCtx?.isAuthenticated && authCtx?.user?.role === "admin" ? (
        <Outlet />
    ) : (
        <Login />
    );
}

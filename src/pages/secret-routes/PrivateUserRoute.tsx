import React from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/contexts";
import { IAuthContext } from "../../interfaces/index";
import Login from "../Auth/Login/Login";

export default function PrivateUserRoute() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);
    return authCtx?.isAuthenticated && authCtx?.user?.role === "user" ? (
        <Outlet />
    ) : (
        <Login />
    );
}

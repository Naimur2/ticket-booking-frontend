import React from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/contexts";
import { IAuthContext } from "../../interfaces/index";
import Public from "../public/Public/Public";

export default function AuthRoute() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);
    return !authCtx?.isAuthenticated ? <Outlet /> : <Public />;
}

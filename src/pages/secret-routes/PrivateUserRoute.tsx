import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/contexts";
import { IAuthContext } from "../../interfaces/index";
import SideNavContainer from "../SideNav/SideNavContainer";

export default function PrivateUserRoute() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);
    return authCtx?.isAuthenticated && authCtx?.user?.role === "user" ? (
        <SideNavContainer>
            <Outlet />
        </SideNavContainer>
    ) : (
        <Navigate to="/login" />
    );
}

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/contexts";
import { IAuthContext } from "../../interfaces/index";
import SideNavContainer from "../SideNav/SideNavContainer";

export default function PrivateAdminRoute() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);
    return authCtx?.isAuthenticated && authCtx?.user?.role === "admin" ? (
        <SideNavContainer>
            <Outlet />
        </SideNavContainer>
    ) : (
        <Navigate to="/login" />
    );
}

import React from "react";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoute() {
    const { isAuthenticated } = useAuth();
    return <div>PrivateRoute</div>;
}

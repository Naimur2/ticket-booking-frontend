import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/contexts";
import { IAuthContext } from "../../interfaces";
import "./SideNav.scss";

interface IRouteProps {
    path: string;
    title: string;
    type: "admin" | "user";
}

export default function SideNavContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    const role = React.useContext<IAuthContext>(AuthContext).user?.role;

    const routes: IRouteProps[] = [
        { path: "/admin", title: "Dashboard", type: "admin" },
        { path: "/admin/buses", title: "Buses", type: "admin" },
        { path: "/admin/locations", title: "Bus Stops", type: "admin" },
        { path: "/admin/coaches", title: "Coaches", type: "admin" },
        { path: "/user/", title: "Book Ticket", type: "user" },
        { path: "/user/my-tickets", title: "My Tickets", type: "user" },
        { path: "/user/editprofile", title: "Edit profile", type: "user" },
        { path: "/admin/editprofile", title: "Edit profile", type: "admin" },
    ];

    const filteredRoutes = routes.filter((route) => route.type === role);

    return (
        <div className="side-nav-container">
            {filteredRoutes.length > 0 && (
                <div className="side-nav">
                    <ul className="side-nav__items">
                        {filteredRoutes.map((route) => {
                            return (
                                <li className="side-nav__item" key={route.path}>
                                    <Link to={route.path}>{route.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            <div className="main-content">{children}</div>
        </div>
    );
}

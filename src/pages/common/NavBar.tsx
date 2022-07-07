import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/contexts";
import { IAuthContext } from "../../interfaces/index";
import React from "react";
import "./NavBar.scss";

export default function NavBar() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);

    const role = authCtx.user?.role;

    const getPrimaryRoute = () => {
        if (role === "admin") {
            return "/admin/";
        }
        if (role === "user") {
            return "/user/";
        }
        return "/";
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to={getPrimaryRoute()}>
                    ZTicket
                </Link>
                {!authCtx.isAuthenticated ? (
                    <Nav className="ms-auto">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                        <Link className="nav-link" to="/register">
                            Register
                        </Link>
                    </Nav>
                ) : (
                    <Nav className="ms-auto">
                        <span
                            onClick={authCtx.logout}
                            className="nav-link pointer"
                        >
                            Logout
                        </span>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
}

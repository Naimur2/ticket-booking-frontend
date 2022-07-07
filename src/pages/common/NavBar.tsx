import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to="/">
                    ZTicket
                </Link>
                <Nav className="me-auto">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

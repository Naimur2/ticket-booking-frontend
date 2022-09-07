import React from "react";
import { getAllData } from "../../../helpers/api-calls";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Main() {
    const navigate = useNavigate();

    return (
        <Container>
            <h1 className="text-center mt-5">Welcome to DashBoard</h1>
            <div className="menu-items">
                <Col
                    onClick={() => navigate("/admin/buses/")}
                    className="col-4 card menu-item"
                >
                    <h1 className="text-center">Buses</h1>
                </Col>
                <Col
                    onClick={() => navigate("/admin/locations/")}
                    className="col-4 card menu-item"
                >
                    <h1 className="text-center">Bus Stops</h1>
                </Col>
                <Col
                    onClick={() => navigate("/admin/coaches/")}
                    className="col-4 card menu-item"
                >
                    <h1 className="text-center">Coaches</h1>
                </Col>
                <Col
                    onClick={() => navigate("/admin/editprofile/")}
                    className="col-4 card menu-item"
                >
                    <h1 className="text-center">Edit profile</h1>
                </Col>
            </div>
        </Container>
    );
}

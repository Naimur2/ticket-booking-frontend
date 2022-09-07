import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { AuthContext } from "../../../context/contexts";
import { IAuthContext } from "../../../interfaces";
import "./Login.scss";
import { useSearchParams } from "react-router-dom";

interface ILoginProps {
    email: string;
    password: string;
}

export default function Login() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);

    const [data, setData] = React.useState<ILoginProps>({
        email: "",
        password: "",
    });

    const [searchParams] = useSearchParams();

    let id = "";
    id = searchParams.get("coachId");

    const [isPasswordShown, setIsPasswordShown] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        authCtx?.login?.(data.email, data.password, id);
    };

    return (
        <Container>
            <div className="auth-form">
                <h1 className="my-4">Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required={true}
                            type="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required={true}
                            type={isPasswordShown ? "text" : "password"}
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="showpass">
                        <Form.Check
                            onChange={() => setIsPasswordShown((prev) => !prev)}
                            type="checkbox"
                            label="Show Password"
                        />
                    </Form.Group>
                    <Button className="my-4" variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

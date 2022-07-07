import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { AuthContext } from "../../../context/contexts";
import { IAuthContext } from "../../../interfaces";
import "./Login.scss";

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

    const [isPasswordShown, setIsPasswordShown] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        authCtx.login(data.email, data.password);
    };

    return (
        <Container>
            <div className="auth-form">
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

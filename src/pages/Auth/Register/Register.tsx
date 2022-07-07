import React from "react";
import { Button, Form, Container } from "react-bootstrap";
import * as Yup from "yup";
import { AuthContext } from "../../../context/contexts";
import { IAuthContext, IUser } from "../../../interfaces";

export default function Register() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);

    const [data, setData] = React.useState<IUser>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const schema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
        termsAccepted: Yup.boolean().oneOf(
            [true],
            "You must accept the terms and conditions"
        ),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validate: IUser = await schema.validate(data, {
                abortEarly: true,
            });

            if (validate) {
                validate.role = "user";
                const userData: IUser = {
                    firstName: validate.firstName,
                    lastName: validate.lastName,
                    email: validate.email,
                    password: validate.password,
                    termsAccepted: validate.termsAccepted,
                    role: validate.role,
                };

                authCtx.register(userData);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <Container>
            <div className="auth-form">
                <h1 className="mb-4">Register</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            value={data.firstName}
                            onChange={(e) =>
                                setData({ ...data, firstName: e.target.value })
                            }
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last name"
                            value={data.lastName}
                            onChange={(e) =>
                                setData({ ...data, lastName: e.target.value })
                            }
                            required={true}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            required={true}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            required={true}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="retypepassword">
                        <Form.Label>Retype Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Retype Password"
                            value={data.confirmPassword}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    confirmPassword: e.target.value,
                                })
                            }
                            required={true}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="showpassword">
                        <Form.Check
                            type="checkbox"
                            label="Show Password"
                            checked={showPassword}
                            onChange={(e) => setShowPassword((prev) => !prev)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="terms">
                        <Form.Check
                            type="checkbox"
                            label="Accept all terms and condition"
                            checked={data.termsAccepted}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    termsAccepted: e.target.checked,
                                })
                            }
                            required={true}
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

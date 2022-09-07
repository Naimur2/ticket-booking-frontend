import axios, { AxiosResponse } from "axios";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { AuthContext } from "../../../context/contexts";
import { IAuthContext, IData, IUser } from "../../../interfaces";

export default function EditProfile() {
    const authCtx = React.useContext<IAuthContext>(AuthContext);

    const [data, setData] = React.useState<IUser>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const schema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password.length > 0) {
            if (data.password !== data.confirmPassword) {
                alert("Passwords must match");
            } else if (data.password.length < 8) {
                alert("Passwords must have at least 8 characters");
            }
        } else {
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
                    };

                    const user = await authCtx?.updateUser(userData);
                    if (user) {
                        alert("Profile updated");
                        setData((prev) => ({ ...prev, ...user }));
                    }
                }
            } catch (error: any) {
                alert(error.message);
            }
        }
    };

    const email = authCtx.user.email;

    React.useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token");
            const res: AxiosResponse<IData> = await axios.post(
                "/api/auth/user-info",
                { email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (res.status === 200 || res.status === 201) {
                const udata = {
                    firstName: res?.data?.user?.firstName,
                    lastName: res?.data?.user?.lastName,
                    email: res?.data?.user?.email,
                    pnone: res?.data?.user?.phone,
                    password: "",
                };
                setData((prev) => ({ ...prev, ...udata }));
            } else {
                alert("Failed to get user info");
            }
        };
        getData();
    }, []);

    return (
        <Container>
            <div className="auth-form">
                <h1 className="mb-4">Edit profile</h1>
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
                            disabled={true}
                            type="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            readOnly={true}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone"
                            value={data.phone}
                            onChange={(e) =>
                                setData({ ...data, phone: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="retypepassword">
                        <Form.Label>Retype new Password</Form.Label>
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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

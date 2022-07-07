import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { LocationContext } from "../../../../context/contexts";
import { ILocation } from "../../../../interfaces";

export default function AddLocation() {
    const locatiinCtx = React.useContext(LocationContext);

    const formRef = React.useRef<HTMLFormElement>(null);
    const [data, setData] = React.useState<ILocation>({
        name: "",
        address: "",
        phone: "",
        email: "",
        description: "",
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        locatiinCtx?.addLocation?.(data);
        formRef.current?.reset();
    };

    return (
        <Container>
            <div className="auth-form">
                <h1 className="mb-5 mx-auto">Add Bus Stop</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    {/* <Form.Group controlId="image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            onChange={(event) => {
                                setData({
                                    ...data,
                                    image: event.target.files[0],
                                });
                            }}
                        />
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required={true}
                            type="text"
                            placeholder="Enter name"
                            value={data.name}
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required={true}
                            type="text"
                            placeholder="Enter address"
                            value={data.address}
                            onChange={(e) =>
                                setData({ ...data, address: e.target.value })
                            }
                            as="textarea"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            required={true}
                            type="text"
                            placeholder="Enter phone"
                            value={data.phone}
                            onChange={(e) =>
                                setData({ ...data, phone: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            required={true}
                            type="text"
                            placeholder="Enter description"
                            value={data.description}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    description: e.target.value,
                                })
                            }
                            as="textarea"
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

import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { LocationContext } from "../../../../context/contexts";
import { ILocation } from "../../../../interfaces";

export default function AddBus() {
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
                <h1 className="mb-5 mx-auto">Add Bus</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Bus image</Form.Label>
                        <Form.Control
                            value={data.image}
                            required={true}
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={(e) =>
                                setData({ ...data, image: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Bus Name</Form.Label>
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

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Seats</Form.Label>
                        <Form.Control
                            required={true}
                            type="number"
                            placeholder="Enter number of seats"
                            min={10}
                            value={data.name}
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Liscense Id</Form.Label>
                        <Form.Control
                            required={true}
                            type="text"
                            placeholder="Liscense Id"
                            value={data.phone}
                            onChange={(e) =>
                                setData({ ...data, phone: e.target.value })
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

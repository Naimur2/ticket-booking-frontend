import React from "react";
import { useParams } from "react-router-dom";
import { LocationContext } from "../../../../context/contexts";
import { Button, Container, Form } from "react-bootstrap";
import { ILocation } from "../../../../interfaces";

export default function UpdateBus() {
    const params = useParams();
    const { id } = params;
    const locationCtx = React.useContext(LocationContext);

    const formRef = React.useRef<HTMLFormElement>(null);
    const [data, setData] = React.useState<ILocation>({
        name: "",
        address: "",
        phone: "",
        email: "",
        description: "",
    });

    React.useEffect(() => {
        (async () => {
            const loc = await locationCtx?.getLoationById?.(id);
            setData(loc);
        })();
    }, [params]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        locationCtx?.updateLocation?.(data);
        formRef.current?.reset();
    };

    return (
        <Container>
            <div className="auth-form">
                <h1 className="mb-5 mx-auto">Add Bus Stop</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>
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

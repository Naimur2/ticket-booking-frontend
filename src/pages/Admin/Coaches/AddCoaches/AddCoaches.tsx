import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { LocationContext, BusContext } from "../../../../context/contexts";
import { ILocation, IBus } from "../../../../interfaces";

interface ICoachProps {
    buses: IBus[];
    locations: ILocation[];
}

export default function AddCoaches() {
    const locatiinCtx = React.useContext(LocationContext);
    const busCtx = React.useContext(BusContext);

    const [initialData, setInitialData] = React.useState<ICoachProps>({
        buses: [],
        locations: [],
    });

    React.useEffect(() => {
        (async () => {
            await busCtx?.get();
            await locatiinCtx?.getAllLocations();
        })();
    }, []);

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

    const handleChange = (event: React.ChangeEvent): void => {
        const target = event.target as HTMLInputElement;
        try {
            if (target.files) {
                setData({ ...data, busImage: target.files[0] });
            } else {
                setData({
                    ...data,
                    [target.name]: target.value,
                });
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <Container>
            <div className="auth-form">
                <h1 className="mb-5 mx-auto">Add Bus</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Select starting bus stop</Form.Label>
                        <Form.Select
                            name="busType"
                            required={true}
                            aria-label="Select bus type"
                            value={data.busType}
                            onChange={handleChange}
                        >
                            {locatiinCtx?.locations.map((location) => (
                                <option key={location._id} value={location._id}>
                                    {location.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Select Destination bus stop</Form.Label>
                        <Form.Select
                            name="busType"
                            required={true}
                            aria-label="Select bus type"
                            value={data.busType}
                            onChange={handleChange}
                        >
                            {locatiinCtx?.locations.map((location) => (
                                <option key={location._id} value={location._id}>
                                    {location.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Select bus</Form.Label>
                        <Form.Select
                            name="busType"
                            required={true}
                            aria-label="Select bus type"
                            value={data.busType}
                            onChange={handleChange}
                        >
                            {busCtx?.buses.map((bus) => (
                                <option key={bus._id} value={bus._id}>
                                    {bus.busName}
                                </option>
                            ))}
                        </Form.Select>
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

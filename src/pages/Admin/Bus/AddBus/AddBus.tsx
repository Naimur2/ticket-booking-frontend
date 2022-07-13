import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { BusContext } from "../../../../context/contexts";
import { IBus, IBusContext } from "../../../../interfaces/index";

export default function AddBus() {
    const formRef = React.useRef<HTMLFormElement>(null);
    const busCtx = React.useContext<IBusContext>(BusContext);

    const [data, setData] = React.useState<IBus>({
        busName: "",
        busLiscenseNumber: "",
        busType: "Non-AC",
        busDescription: "",
        busImage: "",
        seatNumber: "",
    });

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) =>
            formData.append(key, value)
        );
        busCtx?.add?.(formData);
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
                        <Form.Label>Bus image</Form.Label>
                        <Form.Control
                            name="busImage"
                            required={true}
                            type="file"
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Bus Name</Form.Label>
                        <Form.Control
                            name="busName"
                            required={true}
                            type="text"
                            placeholder="Enter name"
                            value={data.busName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Seats</Form.Label>
                        <Form.Control
                            name="seatNumber"
                            required={true}
                            type="number"
                            placeholder="Enter number of seats"
                            min={10}
                            value={data.seatNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Select bus types</Form.Label>
                        <Form.Select
                            name="busType"
                            required={true}
                            aria-label="Select bus type"
                            value={data.busType}
                            onChange={handleChange}
                        >
                            <option value="Non-AC">Non-AC</option>
                            <option value="AC">AC</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Liscense Id</Form.Label>
                        <Form.Control
                            name="busLiscenseNumber"
                            required={true}
                            type="text"
                            placeholder="Liscense Id"
                            value={data.busLiscenseNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="busDescription"
                            required={true}
                            type="text"
                            placeholder="Enter description"
                            value={data.busDescription}
                            onChange={handleChange}
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

import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
    BusContext,
    CoachContext,
    LocationContext,
} from "../../../../context/contexts";
import { ICoach } from "../../../../interfaces/index";

export default function UpdateCoach() {
    const locatiinCtx = React.useContext(LocationContext);
    const busCtx = React.useContext(BusContext);
    const coachCtx = React.useContext(CoachContext);
    const [error, setError] = React.useState<string | null>();
    const params = useParams();

    const formRef = React.useRef<HTMLFormElement>(null);
    const [data, setData] = React.useState<ICoach>({
        bus: "",
        startingPoint: "",
        destination: "",
        startingTime: "",
        price: 0,
        date: "",
        maximumSeats: 0,
    });

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();

        if (data.startingPoint === data.destination) {
            alert("Starting point and destination can't be same");
            return;
        }

        if (
            data.bus === "" ||
            data.startingPoint === "" ||
            data.destination === "" ||
            data.startingTime === "" ||
            data.price === 0 ||
            data.date === ""
        ) {
            alert("Please check all the fields");
            return;
        }
        coachCtx?.update?.(data, params.id);
    };

    const handleChange = (event: React.ChangeEvent): void => {
        const target = event.target as HTMLInputElement;
        try {
            setData({
                ...data,
                [target.name]: target.value,
            });
        } catch (err: any) {
            console.log(err.message);
        }
    };

    React.useEffect(() => {
        (async () => {
            await busCtx?.get?.();
            await locatiinCtx?.getAllLocations?.();
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const fetchedData = await coachCtx?.getById?.(params?.id);
            const coachData = {
                bus: fetchedData?.bus?._id,
                startingPoint: fetchedData?.startingPoint._id,
                destination: fetchedData?.destination._id,
                startingTime: fetchedData?.startingTime,
                price: fetchedData?.price,
                date: new Date(fetchedData?.date).toISOString().split("T")[0],
                maximumSeats: fetchedData?.maximumSeats,
            };
            setData(coachData);
        })();
    }, [params]);

    const filtereStartingPoints = locatiinCtx?.locations?.filter(
        (location) => location._id !== data.destination
    );

    const filtereDestinations = locatiinCtx?.locations?.filter(
        (location) => location._id !== data.startingPoint
    );

    return (
        <Container>
            <div className="auth-form">
                <h1 className="mb-5 mx-auto">Edit Coaches</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="start">
                        <Form.Label>Select starting bus stop</Form.Label>
                        <Form.Select
                            name="startingPoint"
                            required={true}
                            aria-label="Select starting bus stop"
                            value={data?.startingPoint}
                            onChange={handleChange}
                        >
                            <option value="">Select starting bus stop</option>
                            {filtereStartingPoints?.map((location) => (
                                <option key={location._id} value={location._id}>
                                    {location.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="end">
                        <Form.Label>Select Destination bus stop</Form.Label>
                        <Form.Select
                            name="destination"
                            required={true}
                            aria-label="Select Destination bus stop"
                            value={data?.destination}
                            onChange={handleChange}
                        >
                            <option value={""}>
                                Select Destination bus stop
                            </option>
                            {filtereDestinations?.map((location) => (
                                <option key={location._id} value={location._id}>
                                    {location.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bus">
                        <Form.Label>Select bus</Form.Label>
                        <Form.Select
                            name="bus"
                            required={true}
                            aria-label="Select bus type"
                            value={data?.bus}
                            onChange={handleChange}
                        >
                            <option value="">Select bus type</option>
                            {busCtx?.buses.map((bus) => (
                                <option key={bus._id} value={bus._id}>
                                    {bus.busName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            required={true}
                            type="number"
                            placeholder="Enter fair per seat"
                            value={data.price}
                            name="price"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>
                            Maximum number of seats per person
                        </Form.Label>
                        <Form.Control
                            required={true}
                            type="number"
                            placeholder="Enter maximum per person"
                            value={data?.maximumSeats}
                            name="maximumSeats"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="time">
                        <Form.Label>Starting Time</Form.Label>
                        <Form.Control
                            required={true}
                            type="time"
                            placeholder="Enter price per seat"
                            value={data.startingTime}
                            name="startingTime"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            required={true}
                            type="date"
                            placeholder="Enter price per seat"
                            value={data?.date}
                            name="date"
                            onChange={handleChange}
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

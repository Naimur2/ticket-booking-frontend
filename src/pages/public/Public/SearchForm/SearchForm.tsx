import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import {
    BusContext,
    CoachContext,
    LocationContext,
} from "../../../../context/contexts";
import { ICoach } from "../../../../interfaces/index";

interface IProps {
    setSearchResult: (data: ICoach[]) => void;
}

export default function SearchForm(props: IProps) {
    const locatiinCtx = React.useContext(LocationContext);
    const busCtx = React.useContext(BusContext);
    const coachCtx = React.useContext(CoachContext);
    const [error, setError] = React.useState<string | null>();

    React.useEffect(() => {
        (async () => {
            await busCtx?.get?.();
            await locatiinCtx?.getAllLocations?.();
        })();
    }, []);

    const formRef = React.useRef<HTMLFormElement>(null);
    const [data, setData] = React.useState<ICoach>({
        startingPoint: "",
        destination: "",
        date: "",
    });

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        if (data.startingPoint === data.destination) {
            alert("Starting point and destination can't be same");
            return;
        }

        if (
            data.startingPoint === "" ||
            data.destination === "" ||
            data.date === ""
        ) {
            alert("Please check all the fields");
            return;
        }
        const result = await coachCtx?.search?.({
            startingPoint: data.startingPoint,
            destination: data.destination,
            date: data.date,
        });
        props.setSearchResult(result);
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

    const filtereStartingPoints = locatiinCtx?.locations?.filter(
        (location) => location._id !== data.destination
    );

    const filtereDestinations = locatiinCtx?.locations?.filter(
        (location) => location._id !== data.startingPoint
    );

    return (
        <Container>
            <div className="auth-form">
                <h1 className="mb-5 mx-auto">Search Coaches</h1>

                <Form
                    className="align-items-center justify-content-center"
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <Form.Group className="mb-3" controlId="start">
                        <Form.Label>Select starting bus stop</Form.Label>
                        <Form.Select
                            name="startingPoint"
                            required={true}
                            aria-label="Select starting bus stop"
                            value={data.startingPoint}
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
                            value={data.destination}
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
                    <div className="d-flex align-items-center">
                        <Button
                            className="mx-auto"
                            variant="primary"
                            type="submit"
                        >
                            Search
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

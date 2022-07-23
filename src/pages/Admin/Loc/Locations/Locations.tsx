import React from "react";
import { LocationContext } from "../../../../context/contexts";
import { IAddLocationState } from "../../../../interfaces/index";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Locations() {
    const locationCtx = React.useContext<IAddLocationState>(LocationContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        let clean = false;
        (async () => {
            await locationCtx?.getAllLocations?.();
        })();

        return () => {
            clean = true;
            locationCtx?.clean?.();
        };
    }, []);

    const tableHeaders = ["Name", "Address", "Phone", "Email", "description"];

    return (
        <Container>
            <h1 className="mb-5">Bus Stops</h1>
            <Button
                onClick={() => navigate("/admin/add-location")}
                className="mb-4"
            >
                Add Bus Station{" "}
            </Button>{" "}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        {tableHeaders.map((header, index) => {
                            return <th key={index}>{header}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {locationCtx?.locations?.map((location, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{location.name}</td>
                                <td>{location.address}</td>
                                <td>{location.phone}</td>
                                <td>{location.email}</td>
                                <td>{location.description}</td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            navigate(
                                                `/admin/edit-location/${location._id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </Button>{" "}
                                </td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            locationCtx.deleteLocation(
                                                location._id
                                            )
                                        }
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>{" "}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
}

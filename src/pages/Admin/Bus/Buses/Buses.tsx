import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BusContext } from "../../../../context/contexts";
import { IBusContext } from "../../../../interfaces/index";

export default function Buses() {
    const busCtx = React.useContext<IBusContext>(BusContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        let clean = false;
        (async () => {
            await busCtx?.get?.();
        })();

        return () => {
            clean = true;
            busCtx?.clean?.();
        };
    }, []);

    const tableHeaders = [
        "Bus Name",
        "Bus Image",
        "Seats",
        "Liscence Id",
        "Bus Type",
        "Description",
        "Edit",
        "Delete",
    ];

    return (
        <Container>
            <h1 className="mb-5">Buses</h1>
            <Button onClick={() => navigate("/admin/add-bus")} className="mb-4">
                Add Bus{" "}
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
                    {busCtx?.buses?.map((bus, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{bus?.busName}</td>

                                <td>
                                    <img
                                        height={50}
                                        width={50}
                                        src={bus?.busImage}
                                        alt={bus?.busName}
                                    />
                                </td>

                                <td>{bus?.seatNumber}</td>
                                <td>{bus?.busLiscenseNumber}</td>
                                <td>{bus?.busType}</td>
                                <td>{bus?.busDescription}</td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            navigate(
                                                `/admin/edit-bus/${bus?._id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </Button>{" "}
                                </td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            busCtx?.delete?.(bus?._id as string)
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

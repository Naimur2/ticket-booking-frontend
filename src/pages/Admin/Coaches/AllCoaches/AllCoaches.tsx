import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CoachContext } from "../../../../context/contexts";
import { getFullDay } from "../../../../helpers";
import { ICoachContext } from "../../../../interfaces/index";

export default function AllCoaches() {
    const coachCtx = React.useContext<ICoachContext>(CoachContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        let clean = false;
        (async () => {
            await coachCtx?.get?.();
        })();

        return () => {
            clean = true;
            coachCtx?.clean?.();
        };
    }, []);

    const tableHeaders = [
        "Start",
        "Destination",
        "Time",
        "Date",
        "Bus",
        "Fair",
        "",
        "",
    ];

    return (
        <Container>
            <h1 className="mb-5">Buses</h1>
            <Button
                onClick={() => navigate("/admin/add-coach")}
                className="mb-4"
            >
                Add Coach{" "}
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
                    {coachCtx?.coaches?.map((coach, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{coach?.startingPoint?.name}</td>

                                <td>{coach?.destination?.name}</td>
                                <td>{coach?.startingTime}</td>

                                <td>{getFullDay(coach?.date)}</td>
                                <td>{coach?.bus?.busName}</td>
                                <td>{coach?.price}</td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            navigate(
                                                `/admin/edit-coach/${coach?._id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </Button>{" "}
                                </td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            coachCtx.delete(coach._id)
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

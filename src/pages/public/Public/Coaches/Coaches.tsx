import React from "react";
import { Button, Table } from "react-bootstrap";
import { getFullDay } from "../../../../helpers";
import { ICoach } from "../../../../interfaces/index";
import { useNavigate } from "react-router-dom";

export default function Coaches({
    searchResults,
}: {
    searchResults: ICoach[];
}) {
    const navigate = useNavigate();

    const tableHeaders = [
        "Start",
        "Destination",
        "Time",
        "Date",
        "Bus",
        "Fair",
        "",
    ];

    return (
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
                {searchResults?.map((coach, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{coach?.startingPoint?.name} </td>

                            <td> {coach?.destination?.name} </td>
                            <td>{coach?.startingTime}</td>

                            <td>{getFullDay(coach?.date)}</td>
                            <td>{coach?.bus?.busName}</td>
                            <td>{coach?.price}</td>
                            <td>
                                <Button
                                    onClick={() =>
                                        navigate(
                                            "/coach-details?id=" + coach._id
                                        )
                                    }
                                >
                                    Check
                                </Button>{" "}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

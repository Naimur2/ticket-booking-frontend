import React from "react";
import { AuthContext, CoachContext } from "../../../context/contexts";
import { IAuthContext, ICoachContext } from "../../../interfaces/index";
import { Table, Button } from "react-bootstrap";
import { getFullDay, isDateExpired } from "../../../helpers/index";
import { useNavigate } from "react-router-dom";

export default function MyTickets() {
    const coachCtx = React.useContext<ICoachContext>(CoachContext);
    const authCtx = React.useContext<IAuthContext>(AuthContext);
    const [tickets, setTickets] = React.useState<any[]>([]);

    React.useEffect(() => {
        (async () => {
            try {
                const response = await coachCtx?.getUserTickets?.(
                    authCtx?.user?._id
                );
                setTickets(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const tableHeaders = [
        "Start",
        "Destination",
        "Time",
        "Date",
        "Bus",
        "Fair",
        "Seats",
        "",
    ];

    const navigate = useNavigate();

    const role = authCtx.user?.role;

    const getSeats = (seats: any) => {
        const userSeats = seats.filter(
            (seat: any) => seat.seatStatus && seat.user === authCtx.user?._id
        );

        const seatsArray = userSeats.map((seat: any) => seat.seatNumber);

        return seatsArray;
    };

    const onCancel = async (coachId: string, seats) => {
        const res = await coachCtx.cancelTicket(
            coachId,
            seats,
            authCtx.user?._id
        );
        if (res && res === "success") {
            const updatedTickets = tickets.filter(
                (ticket: any) => ticket._id !== coachId
            );
            setTickets(updatedTickets);
            alert("Ticket cancelled successfully");
        }
    };

    console.log(tickets);

    return (
        <div>
            <div className="d-flex align-items-center justify-content-center">
                <h1 className="my-5">My Tickets</h1>
            </div>

            {tickets.length === 0 ? (
                <div className="d-flex align-items-center justify-content-center mt-5">
                    <h3>No Booked Tickets</h3>
                    <Button className="ms-4" onClick={() => navigate("/user/")}>
                        Book Ticket
                    </Button>
                </div>
            ) : (
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
                        {tickets?.map((coach, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{coach?.startingPoint?.name} </td>
                                    <td> {coach?.destination?.name} </td>
                                    <td>{coach?.startingTime}</td>
                                    <td>{getFullDay(coach?.date)}</td>
                                    <td>{coach?.bus?.busName}</td>
                                    <td>
                                        {coach?.price *
                                            getSeats(coach?.seats).length}
                                    </td>
                                    <td>
                                        {getSeats(coach?.seats)?.map((da) => (
                                            <span>{da},</span>
                                        ))}
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                navigate(
                                                    role === "user"
                                                        ? `/user/coach-details?id=${coach._id}`
                                                        : `/coach-details?id=${coach._id}`
                                                )
                                            }
                                        >
                                            View/Edit
                                        </Button>{" "}
                                    </td>
                                    <td>
                                        {isDateExpired(
                                            coach?.startingTime,
                                            coach?.date
                                        ) ? (
                                            <p>Expired</p>
                                        ) : (
                                            <Button
                                                onClick={() =>
                                                    onCancel(
                                                        coach._id,
                                                        getSeats(coach?.seats)
                                                    )
                                                }
                                                variant="danger"
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

import React from "react";
import { Button } from "react-bootstrap";
import { AuthContext, CoachContext } from "../../../../context/contexts";
import {
    IAuthContext,
    ISeat,
    ICoachContext,
} from "../../../../interfaces/index";
import Seat from "./Seat/Seat";
import { useNavigate } from "react-router-dom";

interface IProps {
    seats?: ISeat[];
    maximumSeats?: number;
    coachId: string;
    setUpdatedSeats: (seats: ISeat[]) => void;
}

export default function SelectSeats({
    seats,
    maximumSeats = 4,
    coachId,
}: IProps) {
    const [selectedSeats, setSelectedSeats] = React.useState<ISeat[]>([]);
    const authCtx = React.useContext<IAuthContext>(AuthContext);
    const coachCtx = React.useContext<ICoachContext>(CoachContext);

    const { _id: userId } = authCtx.user;

    const navigate = useNavigate();
    console.log(seats?.filter((seat) => seat.seatStatus === true).length);
    const numberofBookedSeats = seats?.filter(
        (seat) => seat.seatStatus === true
    ).length;

    const numberOfSelectedSeats = selectedSeats?.length;
    const numberOfBookedSeatsByUser = seats?.filter(
        (seat) => seat.user?._id === userId || seat.user === userId
    ).length;
    console.log(numberOfBookedSeatsByUser);

    const getSeatGroup = (s: ISeat[]) => {
        let arr = [];
        s?.forEach((seat, index) => {
            if (index % 4 === 0) {
                arr.push(s.slice(index, index + 4));
            }
        });

        return arr;
    };

    const seatGroup = getSeatGroup(seats);

    const handleSeatClick = (seat: ISeat) => {
        if (numberOfBookedSeatsByUser >= maximumSeats) {
            alert("You have reached the maximum number of seats");
        } else {
            if (selectedSeats.includes(seat)) {
                setSelectedSeats((prev) => prev.filter((s) => s !== seat));
            } else {
                if (selectedSeats.length < maximumSeats) {
                    setSelectedSeats((prev) => [...prev, seat]);
                } else {
                    alert("You can select only " + maximumSeats + " seats");
                }
            }
        }
    };

    const isSelected = (seat: ISeat) => {
        return selectedSeats.includes(seat);
    };

    const handleTicketBooking = async () => {
        if (selectedSeats.length > 0) {
            const result = await coachCtx?.bookCoach?.(
                coachId,
                selectedSeats,
                userId
            );
            if (result) {
                const updatedAllSeats = seats;
                const updatedSeats = selectedSeats.forEach((seat) => {
                    updatedAllSeats?.forEach((s) => {
                        if (s.seatNumber === seat.seatNumber) {
                            s.seatStatus = true;
                        }
                    });
                });
                navigate("/user/my-tickets");
            }
        } else {
            alert("Please select atleast one seat");
        }
    };

    const SeatRow = ({ group }) => {
        return (
            <div className="seat-row">
                {group?.map((seat: ISeat, index: number) => (
                    <Seat
                        onClick={() => handleSeatClick(seat)}
                        isSelected={isSelected(seat)}
                        seat={seat}
                        key={seat?._id + index}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="d-flex-column align-items-center">
            <h1>Select Seats</h1>

            <h5 className="mt-3">
                Available Seats: {seats?.length - numberofBookedSeats || 0}
            </h5>
            {numberOfBookedSeatsByUser < 0 ? (
                <h5 className="mt-3">
                    Seats Selected:{numberOfSelectedSeats || 0}
                </h5>
            ) : (
                <h5>Booked Seats:{numberOfBookedSeatsByUser}</h5>
            )}
            <h5 className="mt-3">Maximum Selection:{maximumSeats || 0}</h5>
            {selectedSeats.length > 0 && (
                <div className="d-flex align-items-center mt-3">
                    {selectedSeats.length > 0 && (
                        <Button
                            onClick={handleTicketBooking}
                            className="mx-auto"
                            variant="primary large"
                        >
                            Book Seats
                        </Button>
                    )}
                </div>
            )}
            <div className="seats">
                {seatGroup.map((group, index) => (
                    <SeatRow key={index} group={group} />
                ))}
            </div>
        </div>
    );
}

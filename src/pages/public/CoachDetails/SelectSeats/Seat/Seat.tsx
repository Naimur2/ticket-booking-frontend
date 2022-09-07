import React from "react";
import { ISeat } from "../../../../../interfaces/index";

const Seat = ({
    seat,
    onClick,
    isSelected,
}: {
    seat: ISeat;
    onClick: (seat: ISeat) => void;
    isSelected: boolean;
}) => {
    return (
        <button
            onClick={onClick}
            disabled={seat.seatStatus}
            className={`seat ${seat?.seatStatus ? "booked" : ""} ${
                isSelected ? "selected" : ""
            }`}
        >
            <span>{seat?.seatNumber}</span>
        </button>
    );
};

export default React.memo(Seat);

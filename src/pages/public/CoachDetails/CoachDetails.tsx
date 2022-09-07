import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CoachContext, AuthContext } from "../../../context/contexts";
import { ICoach, IAuthContext, ISeat } from "../../../interfaces/index";
import { BusDetails, Location } from "../common/comp";
import SelectSeats from "./SelectSeats/SelectSeats";

export default function CoachDetails() {
    const [coachDetails, setCoachDetails] = React.useState<ICoach>();
    const authCtx = React.useContext<IAuthContext>(AuthContext);

    const navigate = useNavigate();

    const coachCtx = React.useContext(CoachContext);

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    React.useEffect(() => {
        (async () => {
            try {
                const response = await coachCtx?.getById?.(id);
                setCoachDetails(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const BusComp = () => (
        <div>
            <h1 className="mb-4">Coach Details</h1>
            <h4>
                Date:
                {(coachDetails?.date &&
                    new Date(coachDetails?.date).toISOString().split("T")[0]) ||
                    ""}
            </h4>
            <h4>Time:{coachDetails?.startingTime}</h4>
            <Row className="mt-5">
                <Col className="col-4 ">
                    <Location
                        coachD={coachDetails?.startingPoint}
                        title="Starting Station"
                    />
                </Col>
                <Col className="col-4">
                    <Location
                        coachD={coachDetails?.destination}
                        title="Ending Location"
                    />
                </Col>
                <Col className="col-4">
                    <BusDetails bus={coachDetails?.bus} />
                </Col>
            </Row>
        </div>
    );

    return (
        <Container className="mt-5">
            <BusComp />
            {authCtx?.isAuthenticated ? (
                <SelectSeats
                    seats={coachDetails?.seats}
                    maximumSeats={coachDetails?.maximumSeats}
                    coachId={id}
                    setUpdatedSeats={(seats: ISeat[]) => {
                        const previousCoachDetails = { ...coachDetails };
                        previousCoachDetails.seats = seats;
                        setCoachDetails(previousCoachDetails);
                    }}
                />
            ) : (
                <Button
                    onClick={() => navigate(`/login?coachId=${id}`)}
                    variant="primary"
                    className="mt-5"
                >
                    Login to View Seats
                </Button>
            )}
        </Container>
    );
}

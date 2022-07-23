import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { CoachContext } from "../../../context/contexts";
import * as React from "react";

export default function CoachDetails() {
    const [coachDetails, setCoachDetails] = React.useState<any>();

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

    console.log(coachDetails);

    const DecrptionTab = ({ title, description }) => {
        return (
            <div className="d-flex ">
                <h6 className="pe-4">{title}</h6>
                <p>{description}</p>
            </div>
        );
    };

    const Location = ({ coachD, title }) => (
        <div className="mb-4 p-4">
            <h3 className="pb-2">{title}</h3>

            {coachD?.name && (
                <DecrptionTab title="Name" description={coachD?.name} />
            )}
            {coachD?.address && (
                <DecrptionTab title="Address" description={coachD?.address} />
            )}

            {coachD?.description && (
                <DecrptionTab
                    title="Description"
                    description={coachD?.description}
                />
            )}
            {coachD?.phone && (
                <DecrptionTab title="Phone" description={coachD?.phone} />
            )}

            {coachD?.email && (
                <DecrptionTab title="Email" description={coachD?.email} />
            )}
        </div>
    );

    const BusDetails = ({ bus }) => (
        <div>
            <h3 className="pt-4 pb-2">Bus Details</h3>

            {bus?.busName && (
                <DecrptionTab title="Bus name" description={bus.busName} />
            )}
            {bus?.busLiscenseNumber && (
                <DecrptionTab
                    title="Liscence Number"
                    description={bus.busLiscenseNumber}
                />
            )}
            {bus?.busDescription && (
                <DecrptionTab
                    title="Bus Description"
                    description={bus.busDescription}
                />
            )}
            {bus?.busType && (
                <DecrptionTab title="Bus Type" description={bus.busType} />
            )}
            {bus?.busType && (
                <DecrptionTab
                    title="Number of Seats"
                    description={bus.seatNumber}
                />
            )}
            {bus?.busImage && (
                <div className="d-flex align-items-center">
                    <h6 className="pb-2">Bus Image</h6>
                    <img
                        height={100}
                        width={100}
                        src={bus.busImage}
                        alt="busImage"
                    />
                </div>
            )}
        </div>
    );
    const arrayFromNumber = (number: number) => {
        return Array.from(Array(number).keys());
    };
    console.log(arrayFromNumber(50));

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Coach Details</h1>
            <Row>
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
                <Col className="col-4"></Col>
            </Row>
        </Container>
    );
}

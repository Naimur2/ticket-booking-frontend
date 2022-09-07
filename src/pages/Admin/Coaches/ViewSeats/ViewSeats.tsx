import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CoachContext } from "../../../../context/contexts";
import { ICoach, ICoachContext } from "../../../../interfaces/index";
import { BusDetails, Location } from "../../../public/common/comp";

export default function ViewTickets() {
    const coachCtx = React.useContext<ICoachContext>(CoachContext);

    const params = useParams();

    const [data, setData] = React.useState<ICoach>({});

    React.useEffect(() => {
        (async () => {
            const fetchedData = await coachCtx?.getById?.(params?.coachId);
            setData(fetchedData);
        })();
    }, [params]);

    const tableHeaders = ["Seat", "User", "Email", "Phone"];

    return (
        <Container>
            <Row>
                <Col className="col-4 ">
                    <Location
                        coachD={data?.startingPoint}
                        title="Starting Station"
                    />
                </Col>
                <Col className="col-4">
                    <Location
                        coachD={data?.destination}
                        title="Ending Location"
                    />
                </Col>
                <Col className="col-4">
                    <BusDetails bus={data?.bus} />
                </Col>
            </Row>
            <div>
                <h1 className="mb-5">Tickets</h1>
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
                        {data?.seats?.map((coach, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{coach?.seatNumber}</td>
                                    <td>
                                        {coach?.user?.firstName}
                                        {coach?.user?.lastName}
                                    </td>
                                    <td>{coach?.user?.email}</td>
                                    <td>{coach?.user?.phone}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

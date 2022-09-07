import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchForm from "./SearchForm/SearchForm";
import Coaches from "./Coaches/Coaches";

export default function Public() {
    const [searchResult, setSearchResult] = React.useState<any>(null);

    console.log("dfgfdgfd", searchResult);

    return (
        <Container>
            <Row>
                <Col className="col-6 search">
                    <SearchForm
                        setSearchResult={(res) => setSearchResult(res)}
                    />
                </Col>
                <Col className="mt-5 d-flex align-items-center justify-content-center col-6">
                    {searchResult?.length > 0 && (
                        <div>
                            <p>Total {searchResult.length} results found. </p>
                            <Coaches searchResults={searchResult} />
                        </div>
                    )}
                    {searchResult?.length === 0 && (
                        <h1 className="text-center">No result found</h1>
                    )}
                    {!searchResult && (
                        <h1 className="text-center">Search here</h1>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

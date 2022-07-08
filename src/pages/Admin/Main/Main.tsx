import React from "react";
import { getAllData } from "../../../helpers/apicalls";

export default function Main() {
    React.useEffect(() => {
        (async () => {
            try {
                const response = await getAllData("/api/locations/");
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return <div>Main</div>;
}

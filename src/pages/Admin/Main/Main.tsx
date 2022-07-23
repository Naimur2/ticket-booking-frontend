import React from "react";
import { getAllData } from "../../../helpers/api-calls";

export default function Main() {
    React.useEffect(() => {
        (async () => {
            try {
                const response = await getAllData("/api/locations/");
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return <div>Main</div>;
}

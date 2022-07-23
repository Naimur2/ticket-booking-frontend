import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import LocationProvider from "./context/LocationProvider";
import BusProvider from "./context/BusProvider";
import CoachProvider from "./context/CoachProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <LocationProvider>
                <BusProvider>
                    <CoachProvider>
                        <App />
                    </CoachProvider>
                </BusProvider>
            </LocationProvider>
        </AuthProvider>
    </BrowserRouter>
    // </React.StrictMode>
);

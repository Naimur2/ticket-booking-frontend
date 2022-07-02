import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404/404";
import NavBar from "./pages/common/NavBar";
import Home from "./pages/User/Home/Home";

export default function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

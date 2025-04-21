import React from "react";
import "./App.css";
import LandingPage from "./components/landingPage";
import AboutPage from "./components/aboutPage";

import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </div>
    );
}

export default App;

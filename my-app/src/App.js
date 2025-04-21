import React from "react";
import "./App.css";
import SearchPage from "./components/searchPage";
import AboutPage from "./components/aboutPage";
import LandingPage from "./components/landingPage";

import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </div>
    );
}

export default App;

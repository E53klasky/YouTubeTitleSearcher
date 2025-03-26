import React from "react";
import "./App.css";
import LandingPage from "./components/landingPage";
import TrieTesting from "./TrieTesting";
import HashMapTesting from "./HashMapTesting";

function App() {
    return (
        <div className="App">
            <LandingPage />
            <TrieTesting />
            <HashMapTesting/>
        </div>
    );
}

export default App;

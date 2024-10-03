import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="our_mission">
      <h1> OUR MISSION </h1>
      <div className="mission_text">
        <p>Safety Straw’s mission is to eliminate the number of</p>
        <p>date rape victims from the world. Our goal is to</p>
        <p>create a <span className="highlight">safer</span>, more <span className="highlight">secure</span> nightlife environment.</p>
      </div>
      <p className="author"> ~ Jack & Zak </p>
    </div>
  );
}

export default App;

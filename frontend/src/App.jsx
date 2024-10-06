import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WaitlistBar from "./components/WaitlistBar.jsx";
import WaitlistModal from "./components/WaitlistModal.jsx";

function App() {
  return <div className="app">
    <WaitlistBar/>
    <WaitlistModal/>
  </div>;
}

export default App;

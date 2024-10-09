import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Video from "./components/video";
import Our_mission from "./components/our_mission"
import Background from "./components/background";

function App() {
  return (
  <div>
    <Background/>
    <Our_mission/>
  </div>
  )
} 

export default App;

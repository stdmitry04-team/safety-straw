import { useState } from "react";
import viteLogo from "/vite.svg";
import Footer from "./components/footer.jsx";
import Video from "./components/video";
import "./App.css";
import WaitlistBar from "./components/WaitlistBar.jsx";
import WaitlistModal from "./components/WaitlistModal.jsx";



function App() {
  return (
    <div class="app">
      <Video/>
      <WaitlistBar/>
      <WaitlistModal/>
      <Footer/>
    </div>

  );
}

export default App;

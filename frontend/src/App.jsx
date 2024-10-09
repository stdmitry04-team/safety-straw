import { useState } from "react";
import "./App.css";
import Navbar from "./components/nav.jsx";
import Video from "./components/video.jsx";
import Footer from "./components/footer.jsx"


function App() {
  return (
    <div class="app">
      <Navbar></Navbar>
      <Video/>
      <Footer/>
    </div>

  );

}

export default App;

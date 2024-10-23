import { useState } from "react";
import "./App.css";
import Navbar from "./components/nav.jsx";
import Video from "./components/video.jsx";
import Footer from "./components/footer.jsx"
import Background from "./components/background.jsx"
import Mission from "./components/our_mission.jsx"
import Product from "./components/product.jsx"
import Merchandise from "./components/merchandise.jsx";




function App() {
  return (
    <div class="app">
      <Navbar/>
      <Video/>
      <Product></Product>
      <Background></Background>
      <Mission></Mission>
      <Merchandise></Merchandise>
      <Footer/>
    </div>

  );

}

export default App;

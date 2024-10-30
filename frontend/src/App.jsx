import { useState } from "react";
import "./App.css";
import Navbar from "./components/nav.jsx";
import Video from "./components/video.jsx";
import Footer from "./components/footer.jsx"
import Background from "./components/background.jsx"
import Mission from "./components/our_mission.jsx"
import Product from "./components/product.jsx"
import WaitlistBar from "./components/WaitlistBar.jsx";
import WaitlistModal from "./components/WaitlistModal.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Blogsection from "./components/blogsection.jsx";

import BarLocator from "./components/BarLocator.jsx";



function App() {
  return (
    <div className="app">
<<<<<<< HEAD
      
      <BarLocator />
=======
      <Navbar/>
      <Video/>
      <Product></Product>
      <Background></Background>
      <Mission></Mission>
      <AboutUs></AboutUs>
      <Blogsection></Blogsection>
      <WaitlistBar/>
      <Footer/>
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
    </div>

  );

}

export default App;

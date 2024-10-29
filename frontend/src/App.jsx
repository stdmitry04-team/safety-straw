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
<<<<<<< HEAD
import BlogPost from "./components/blogpost.jsx"
import BlogSection from "./components/blogsection.jsx"

=======
import Blogsection from "./components/blogsection.jsx";
>>>>>>> 380b713340ae1ff150f24f989a271e044ae5227e




function App() {
  return (
    <div className="app">
      <Navbar/>
      <Video/>
      <Product></Product>
      <Background></Background>
      <Mission></Mission>
      <AboutUs></AboutUs>
<<<<<<< HEAD
      <BlogSection></BlogSection>
=======
      <Blogsection></Blogsection>
>>>>>>> 380b713340ae1ff150f24f989a271e044ae5227e
      <WaitlistBar/>
      <Footer/>
      
    </div>

  );

}

export default App;

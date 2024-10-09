import { useState } from "react";
import Footer from "./components/footer.jsx";
import Video from "./components/video";
import Product from "./components/product";
import Navbar from "./components/nav";

import "./App.css";



function App() {
  return (
    <div class="app">
      <Navbar/>
      <Video/>
      <Product/>
      <Footer/>
    </div>

  );

}

export default App;

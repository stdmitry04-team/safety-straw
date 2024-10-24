import React, { useState, useEffect } from 'react';
import "../styles/product.css";
import back from "../assets/product.svg";
import mobileBack from "../assets/mobile-product.svg"; // Import the mobile background
import straw from "../assets/straw.svg";
import l_arr from "../assets/left-arrow.svg";
import r_arr from "../assets/right-arrow.svg";

export default function Product() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check if screen width is 390px or less
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="our-product">
      {/* Conditionally render background image based on 390px screen width */}
      <img className="our-product-background" src={isSmallScreen ? mobileBack : back} alt="Background" />

      <h1 className="our-product-paragraph">OUR PRODUCT</h1>
      <p className="our-product-text-1">
        Safety Straw is the <span className="text-1-color">first</span> date rape
        <br />
        detection straw in the <span className="text-1-color">entire market.</span>
      </p>
      <p className="our-product-text-2">
        We offer a variety of sizes, fit for
        <br />
        any and all establishments.
      </p>
      <button className="join-waitlist">Join Waitlist</button>

      <img className="l_arr" src={l_arr} alt="" />
      <p className="l_text">
        Color changes from
        <br />
        yellow to red when
        <br />
        the straw comes
        <br />
        into contact with a
        <br />
        drugged liquid
      </p>
      <img className="straw" src={straw} alt="" />
      <p className="r_text">
        Made from
        <br />
        material...
      </p>
      <img className="r_arr" src={r_arr} alt="" />
    </div>
  );
}

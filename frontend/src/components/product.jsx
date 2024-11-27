import React, { useState, useEffect } from "react";
import "../styles/product.css";
import back from "../assets/product.svg";
import mobileBack from "../assets/mobile-product.svg";
import straw from "../assets/straw.svg";
import l_arr from "../assets/left-arrow.svg";
import r_arr from "../assets/right-arrow.svg";

export default function Product() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 430);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBuyNowClick = () => {
    window.location.href = '/checkout';
  };

  return (
    <div className="our-product">
      <img className="our-product-background" src={back} alt="Background" />
      <div className="product-text-container">
        <h1 className="our-product-paragraph">OUR PRODUCT</h1>
        <p className="our-product-text-1 our-product-text">
          Safety Straw is the <span className="text-1-color">first</span> date rape
          <br />
          detection straw in the{" "}
          <span className="text-1-color">entire market.</span>
        </p>
        <p className="our-product-text-2 our-product-text">
          We offer a variety of sizes, fit for
          <br />
          any and all establishments.
        </p>
        <button onClick={handleBuyNowClick} className="product-buy-now">
          Buy Now!
        </button>
      </div>
      <div className="diagram-container">
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
    </div>
  );
}
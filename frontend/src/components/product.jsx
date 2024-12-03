import React from "react";
import "../styles/Product1.css";
import back from "../assets/product.svg";
import mob_back from "../assets/mobile-product.svg";
import straw from "../assets/straw.svg";
import l_arr from "../assets/left-arrow.svg";
import r_arr from "../assets/right-arrow.svg";

export default function Product() {
  const handleBuyNowClick = () => {
    window.location.href = '/checkout';
  };

  return (
    <div className="our-product">
      <img className="our-product-background" src={back} alt="Background" />
      
      <div className="product-content">
        {/* Left side with straw diagram */}
        <div className="product-diagram">
          <div className="annotation left-annotation">
            Color changes from<br />
            yellow to red when<br />
            the straw comes<br />
            into contact with a<br />
            drugged liquid
          </div>
          <img className="arrow left-arrow" src={l_arr} alt="" />
          
          <img className="straw" src={straw} alt="" />
          
          <img className="arrow right-arrow" src={r_arr} alt="" />
          <div className="annotation right-annotation">
            Made from<br />
            material...
          </div>
        </div>

        {/* Right side with product info */}
        <div className="product-info">
          <h1 className="our-product-paragraph">OUR PRODUCT</h1>
          <p className="our-product-text">
            Safety Straw is the <span className="text-1-color">first</span> date rape
            detection straw in the{" "}
            <span className="text-1-color">entire market.</span>
          </p>
          <p className="our-product-text">
            We offer a variety of sizes, fit for
            any and all establishments.
          </p>
          <button onClick={handleBuyNowClick} className="product-buy-now">
            Buy Now!
          </button>
        </div>
      </div>
    </div>
  );
}
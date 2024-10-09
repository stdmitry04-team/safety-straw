import { useState } from "react";
import "../styles/Product.css";
import backgroundbottom from "../assets/background-bottom.svg"
import straw from "../assets/straw2.svg"
import strawtop from "../assets/straw.svg"
import rightarrow from "../assets/rightlabel.svg"
import leftarrow from "../assets/leftarrow.svg"
import bubbles from "../assets/bubbles.svg"



function Product(){
    return (
        <div className = "product">
            <img className="backgroundbottom" src= {backgroundbottom} alt=" background bottom portion" />
            <img className="bubbles" src= {bubbles} alt="bubble background portion" />
            <div className = "product-left">
            <p className="product-left-description">Color changes from <br/>yellow to red when <br/>the straw comes <br/>into contact with a <br/>drugged liquid</p>
            <p className="product-right-description">Made from <br/>material...</p>
            <img className = "straw" src={straw} alt="Straw Image" />
            <img className = "strawtop" src={strawtop} alt="Straw Top Image" />

            <img className = "rightarrow" src={rightarrow} alt="right arrow" />
            <img className = "leftarrow" src={leftarrow} alt="left arrow" />
            </div>
            
            <div className = "product-right">
                <p className="our-product">OUR PRODUCT</p>
                <p className ="our-product-text-1">Safety Straw is the <span class="red">first</span> date rape <br /> detection straw in the <span class="red">entire market.</span></p> 
                <p className = "our-product-text-2"> We offer a variety of sizes, fit for <br />any and all establishments</p>
                <button className="waitlist-button">Join Waitlist</button>
            </div>
        </div>
        
    );
}

export default Product
import { useState } from "react";
import "../styles/Product.css";
import backgroundbottom from "../assets/background-bottom.svg"
import straw from "../assets/straw2.svg"
import rightarrow from "../assets/rightlabel.svg"
import leftarrow from "../assets/leftarrow.svg"
import bubbles from "../assets/bubbles.svg"



function Product(){
    return (
        <div class = "product">
            <img class="backgroundbottom" src= {backgroundbottom} alt=" background bottom portion" />
            <img class="bubbles" src= {bubbles} alt="bubble background portion" />
            <div class = "product-left">
            <p class="product-left-description">Color changes from <br/>yellow to red when <br/>the straw comes <br/>into contact with a <br/>drugged liquid</p>
            <p class="product-right-description">Made from <br/>material...</p>
            <img class = "straw" src={straw} alt="Straw Image" />
            <img class = "rightarrow" src={rightarrow} alt="right arrow" />
            <img class = "leftarrow" src={leftarrow} alt="left arrow" />
            </div>
            
            <div class = "product-right">
                <p class="our-product">OUR PRODUCT</p>
                <p class ="our-product-text-1">Safety Straw is the <span class="red">first</span> date rape <br /> detection straw in the <span class="red">entire market.</span></p> 
                <p class = "our-product-text-2"> We offer a variety of sizes, fit for <br />any and all establishments</p>
                <button class="waitlist-button">Join Waitlist</button>
            </div>
        </div>
        
    );
}

export default Product
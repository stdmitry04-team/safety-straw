import { useState } from "react";
import "../styles/Product.css";
import strawimage from "../assets/strawimage.png"
import productimagewave from "../assets/productimagewave.png"

function Product(){
    return (
        <div class = "product">
            {/* <div class = "product-left">
                    <p class = "product-left-left-desc">Color changes from <br/>yellow to red when<br/> the straw comes <br/> into contact with a <br/>drugged liquid</p>
                    <img class = "straw-image" src={strawimage} alt="Straw Image"></img>
                    <p class = "product-left-right-desc">Made from<br/> material...</p>
            </div> */}
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
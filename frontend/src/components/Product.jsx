import { useState } from "react";
import "../styles/Product.css";
import strawimage from "../assets/strawimage.png"
import productimagewave from "../assets/productimagewave.png"

function Product(){
    return (
        <div class = "product">
            <div class = "product-left">
                    <p class = "product-left-left-desc">Color changes from yellow to red when the straw scomes into contact with a drugged liquid</p>
                    <img src={strawimage} alt="Straw Image"></img>
                    <p class = "product-left-right-desc">Made from material...</p>
            </div>
            <div class = "product-right">
                <h3>OUR PRODUCT</h3>
                <h5>Safety Straw is the <span class="red">first</span> date rape detection straw in the <span class="red">entire market.</span></h5>
                <h5>We offer a variety of sizes, fit for any and all establishments.</h5>
                <button class="waitlist-button">Join Waitlist</button>
            </div>
            
        </div>
        
    );
}

export default Product
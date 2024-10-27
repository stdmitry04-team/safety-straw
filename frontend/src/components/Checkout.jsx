import Footer from "./footer";
import Navbar from "./nav";
import '../styles/Checkout.css';
import arrow from '../assets/checkout-arrow.svg'
import img_top from '../images/checkout-pic-top.png';
import img_mid from '../images/checkout-pic-mid.png';
import img_bottom from '../images/checkout-pic-bottom.png';
import straws_img from '../images/checkout-straws.png';
import React, {useState} from 'react';


export default function Checkout(){
    const [quantity, setQuantity] = useState(100);

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    return(
        <>
            <Navbar></Navbar>
            <div className="checkout-top">
                <div className="left-imgs">
                    <img src={img_top} alt="straw-img-top" />
                    <img src={img_mid} alt="straw-img-mid" />
                    <img src={img_bottom} alt="straw-img-bottom" />
                    <img src={img_bottom} alt="straw-img-bottom" />
                </div>
                <img className="straws-img" src={straws_img} alt="straw-img-main" />
                <div className="right-nav">
                    <p className="straws-title">Safety Straw (Color-Changing Drug Detection Straws)</p>
                    <div className="price">
                        <span class="currency">$</span>
                        <span class="amount">10</span>
                        <span class="cents">99</span>   
                    </div>

                    <select className="quantity-dropdown" id="quantity" name="quantity" value={quantity} onChange={handleChange}>
                        {Array.from({ length: 10 }, (_, index) => (
                        <option key={(index + 1) * 100} value={(index + 1) * 100}>
                            Qty: {(index + 1) * 100} Pack
                        </option>
                        ))}
                    </select>
                    
                    <div className="continue-purchase">
                        <h1>
                            <a href="#section1" className="purchase-link">Continue to purchase</a>
                        </h1>
                        <a href="#section2" className="arrow-link">
                            <img src={arrow} alt="continue-arrow" />
                        </a>
                    </div>
                
                </div>

            </div>
          


            <div className="checkout-bottom"></div>



            {/* <Footer></Footer> */}

        </>
    )
}
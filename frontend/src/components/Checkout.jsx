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
          


            <div className="checkout-bottom">
                <div className="payment-information">
                    {/* <h1 className="payment-info">Payment Information</h1> */}
                    <form className="checkout-form" action="#">
                        <div class="input-group">
                            <input type="text" placeholder="Company Name (optional)"></input>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Phone Number (optional)"></input>
                        </div>
                        
                        <h3>Pay With Card</h3>
                        <div class="input-group">
                            <input type="text" placeholder="Name on Card"></input>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Card Number"></input>
                        </div>
                        <div class="input-group">
                            <div class="half-width">
                                <input type="text" placeholder="Ex. Date 00/00"></input>
                            </div>
                            <div class="half-width">
                                <input type="text" placeholder="CVV"></input>
                            </div>
                        </div>
                        
                        <h3>Pay With Checking Account</h3>
                        <div class="input-group">
                            <input type="text" placeholder="Name on Account"></input>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Routing Number"></input>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Account Number"></input>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Confirm Account Number"></input>
                        </div>
                        
                        <h3>Mailing Address</h3>
                        <div class="input-group">
                            <input type="text" placeholder="Address"></input>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Apartment, suite, etc."></input>
                        </div>
                        <div class="input-group">
                            <div class="half-width">
                                <input type="text" placeholder="City"></input>
                            </div>
                            <div class="half-width">
                                <select>
                                    <option>State</option>
                                    <option>Michigan</option>
                                </select>
                            </div>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="ZIP Code"></input>
                        </div>
                        
                        <h3>Billing Address</h3>
                        <div class="checkbox-group">
                            <input type="checkbox" id="sameAddress"></input>
                            <label for="sameAddress">same as mailing address</label>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Address"></input>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Apartment, suite, etc."></input>
                        </div>
                        <div class="input-group">
                            <div class="half-width">
                                <input type="text" placeholder="City"></input>
                            </div>
                            <div class="half-width">
                                <select>
                                    <option>State</option>
                                    <option>Michigan</option>
                                </select>
                            </div>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="ZIP Code"></input>
                        </div>
                    </form>

                </div>
                    
                <div className="summary"></div>
            </div>



            {/* <Footer></Footer> */}

        </>
    )
}
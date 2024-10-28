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
    const [checked, setChecked] = useState(false);
    const [mstate, setMstate] = useState('Michigan');
    const [bstate, setBstate] = useState('Michigan');

    
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            
            window.history.pushState('', '', targetId);
        }
    };


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
                            <a 
                                href="#checkout" 
                                className="purchase-link"
                                onClick={smoothScroll}
                            >
                                Continue to purchase
                            </a>
                        </h1>
                        <a 
                            href="#checkout" 
                            className="arrow-link"
                            onClick={smoothScroll}
                        >
                            <img src={arrow} alt="continue-arrow" />
                        </a>
                    </div>
                
                </div>

            </div>
          


            <div className="checkout-bottom" id="checkout">
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
                        <div class="input-group date-cvv">
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
                        <div class="input-group city-state-zip">
                            <div class="half-width">
                                <input type="text" placeholder="City"></input>
                            </div>

                            <div className="select-wrapper">
                                <label className="select-label">State</label>
                                <select 
                                value={mstate} 
                                onChange={(e) => setMstate(e.target.value)}
                                className="select-field"
                                >
                                <option value="Michigan">Michigan</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <input type="text" placeholder="ZIP Code"></input>
                            </div>
                        </div>

                        <h3>Billing Address</h3>
                        <div className="checkbox-group">
                            <button
                                onClick={() => setChecked(!checked)}
                                className={`custom-checkbox ${checked ? 'checked' : ''}`}
                                aria-checked={checked}
                                role="checkbox"
                                type="button"
                            >
                                {checked && <div className="checkmark" />}
                            </button>
                            <span className="same-as-label">same as mailing address</span>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Address"></input>
                        </div>
                        <div class="input-group">
                            <input type="text" placeholder="Apartment, suite, etc."></input>
                        </div>
                        <div class="input-group city-state-zip">
                            <div class="half-width">
                                <input type="text" placeholder="City"></input>
                            </div>

                            <div className="select-wrapper">
                                <label className="select-label">State</label>
                                <select 
                                value={bstate} 
                                onChange={(e) => setBstate(e.target.value)}
                                className="select-field"
                                >
                                <option value="Michigan">Michigan</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <input type="text" placeholder="ZIP Code"></input>
                            </div>
                        </div>
                    </form>

                </div>
                    
                <div className="summary">
                    <div className="summary-info">
                        <div className="summary-line items">
                            <h1>Items {}:</h1>
                            <h1>${}</h1>
                        </div>
                        <div className="summary-line shipping">
                            <h1>Shipping:</h1>
                            <h1>${}</h1>
                        </div>
                        <div className="summary-line before-tax">
                            <h1>Total before tax:</h1>
                            <h1>${}</h1>
                        </div>
                        <div className="summary-line tax">
                            <h1>Tax:</h1>
                            <h1>${}</h1>
                        </div>
                        <div className="summary-line total">
                            <h1>Order total:</h1>
                            <h1>${}</h1>
                        </div>
                    </div>
                    <button className="place-order"></button>
                </div>
            </div>



            {/* <Footer></Footer> */}

        </>
    )
}
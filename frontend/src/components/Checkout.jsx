import Footer from "./footer";
import Navbar from "./nav";
import '../styles/Checkout.css';
import arrow from '../assets/checkout-arrow.svg'
import img_top from '../images/checkout-pic-top.png';
import img_mid from '../images/checkout-pic-mid.png';
import img_bottom from '../images/checkout-pic-bottom.png';
import straws_img from '../images/checkout-straws.png';
import React, {useState, useEffect} from 'react';


export default function Checkout(){

    const [quantity, setQuantity] = useState(100);
    const [checked, setChecked] = useState(false);
    const [companyname, setCompanyName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    

    const [payerInfo, setPayerInfo] = useState({
        companyName: '',
        phoneNumber: ''
    });

    const [cardInfo, setCardInfo] = useState({
        nameOnCard: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const [checkingInfo, setCheckingInfo] = useState({
        nameOnAccount: '',
        routingNumber: '',
        accountNumber: '',
        confirmAccountNumber: ''
    });

    const [mailingAddress, setMailingAddress] = useState({
        address: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
    });

    const [billingAddress, setBillingAddress] = useState({
        address: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
    };
    
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    // Main address change handler
    const handleAddressChange = (e, addressType) => {
        const { name, value } = e.target;
        if (addressType === 'mailing') {
            setMailingAddress(prev => ({ ...prev, [name]: value }));
        } else {
            setBillingAddress(prev => ({ ...prev, [name]: value }));
        }
    };

    // useEffect to sync billingAddress with mailingAddress if checked is true
    useEffect(() => {
        if (checked) {
            setBillingAddress(mailingAddress);
        }
    }, [mailingAddress, checked]);  // Re-run when mailingAddress or checked changes

        // Card and Checking info updates
        const handleInputChange = (e, section) => {
            const { name, value } = e.target;
            if (section === 'card') {
                setCardInfo(prev => ({ ...prev, [name]: value }));
            } else if (section === 'checking') {
                setCheckingInfo(prev => ({ ...prev, [name]: value }));
            }
        };
    
        // Handle form submission
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            const formData = {
                quantity,
                mailingAddress,
                billingAddress: checked ? mailingAddress : billingAddress,
                mstate,
                bstate: checked ? mstate : bstate,
            };

            try {
                const response = await fetch('https://localhost:5000/api/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Order submitted successfully!');
                } else {
                    alert('Failed to submit the order.');
                }
            } catch (error) {
                console.error('Error submitting order:', error);
            }
        };



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
                <div className="straws-img">
                    <img className="straws-img" src={straws_img} alt="straw-img-main" />

                </div>
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
                            <input
                                type="text"
                                placeholder="Name on Card"
                                name='nameOnCard'
                                onChange={(e) => handleInputChange(e, 'card')}
                                value={cardInfo.nameOnCard}
                                ></input>
                        </div>
                        <div class="input-group">
                            <input
                                type="text"
                                placeholder="Card Number"
                                name='cardNumber'
                                onChange={(e) => handleInputChange(e, 'card')}
                                value={cardInfo.cardNumber}
                            ></input>
                        </div>
                        <div class="input-group date-cvv">
                            <div class="half-width">
                                <input 
                                    type="text"
                                    placeholder="Ex. Date 00/00"
                                    name='expiryDate'
                                    onChange={(e) => handleInputChange(e, 'card')}
                                    value={cardInfo.expiryDate}
                                ></input>
                            </div>
                            <div class="half-width">
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    name='cvv'
                                    onChange={(e) => handleInputChange(e, 'card')}
                                    value={cardInfo.cvv}
                                ></input>
                            </div>
                        </div>
                        
                        <h3>Pay With Checking Account</h3>
                        <div class="input-group">
                            <input
                                type="text"
                                placeholder="Name on Account"
                                name='nameOnAccount'
                                onChange={(e) => handleInputChange(e, 'checking')}
                                value={checkingInfo.nameOnAccount}
                            ></input>
                        </div>
                        <div class="input-group">
                            <input
                                type="text"
                                placeholder="Routing Number"
                                name='routingNumber'
                                onChange={(e) => handleInputChange(e, 'checking')}
                                value={checkingInfo.routingNumber}
                            ></input>
                        </div>
                        <div class="input-group">
                            <input
                                type="text"
                                placeholder="Account Number"
                                name='accountNumber'
                                onChange={(e) => handleInputChange(e, 'checking')}
                                value={checkingInfo.accountNumber}
                            ></input>
                        </div>
                        <div class="input-group">
                            <input
                                type="text"
                                placeholder="Confirm Account Number"
                                name='confirmAccountNumber'
                                onChange={(e) => handleInputChange(e, 'checking')}
                                value={checkingInfo.confirmAccountNumber}
                            ></input>
                        </div>
                        
                        <h3>Mailing Address</h3>
                        <div class="input-group">
                            <input
                                type="text"
                                placeholder="Address"
                                name='address'
                                onChange={(e) => handleAddressChange(e, 'mailing')}
                                value={mailingAddress.address}
                            ></input>
                        </div>
                        <div class="input-group">
                            <input
                                type="text"
                                placeholder="Apartment, suite, etc."
                                name='apartment'
                                onChange={(e) => handleAddressChange(e, 'mailing')}
                                value={mailingAddress.apartment}
                            ></input>
                        </div>
                        <div class="input-group city-state-zip">
                            <div class="half-width">
                                <input
                                    type="text"
                                    placeholder="City"
                                    name='city'
                                    onChange={(e) => handleAddressChange(e, 'mailing')}
                                    value={mailingAddress.city}
                                ></input>
                            </div>

                            <div className="select-wrapper">
                                <label className="select-label">State</label>
                                <select 
                                value={mailingAddress.state} 
                                name='state'
                                onChange={(e) => handleAddressChange(e, 'mailing')}
                                className="select-field"
                                >
                                <option value="Michigan">Michigan</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <input
                                    type="text"
                                    placeholder="ZIP Code"
                                    name='zip'
                                    onChange={(e) => handleAddressChange(e, 'mailing')}
                                    value={mailingAddress.zip}
                                ></input>
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
                            <input
                                type="text"
                                placeholder="Address"
                                name='address'
                                onChange={(e) => handleAddressChange(e, 'billing')}
                                value={billingAddress.address}
                            ></input>
                        </div>
                        <div class="input-group">
                            <input
                                type="text"
                                placeholder="Apartment, suite, etc."
                                name='apartment'
                                onChange={(e) => handleAddressChange(e, 'billing')}
                                value={billingAddress.apartment}
                            ></input>
                        </div>
                        <div class="input-group city-state-zip">
                            <div class="half-width">
                                <input
                                    type="text"
                                    placeholder="City"
                                    name='city'
                                    onChange={(e) => handleAddressChange(e, 'billing')}
                                    value={billingAddress.city}
                                ></input>
                            </div>

                            <div className="select-wrapper">
                                <label className="select-label">State</label>
                                <select 
                                value={billingAddress.state}
                                name='state' 
                                onChange={(e) => handleAddressChange(e, 'billing')}
                                className="select-field"
                                >
                                <option value="Michigan">Michigan</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <input
                                    type="text"
                                    placeholder="ZIP Code"
                                    name='zip'
                                    onChange={(e) => handleAddressChange(e, 'billing')}
                                    value={billingAddress.zip}
                                ></input>
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
                    <button className="place-order">Place Your Order</button>

                </div>

            </div>



            <Footer></Footer>

        </>
    )
}
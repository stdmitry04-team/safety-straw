import Footer from "./footer";
import Navbar from "./nav";
import '../styles/Checkout.css';
import arrow from '../assets/checkout-arrow.svg'
import img_top from '../images/checkout-pic-top.png';
import img_mid from '../images/checkout-pic-mid.png';
import img_bottom from '../images/checkout-pic-bottom.png';
import straws_img from '../images/checkout-straws.png';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function Checkout() {
    const [quantity, setQuantity] = useState(1);
    const [checked, setChecked] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            companyName: '',
            phoneNumber: '',
            card: {
                nameOnCard: '',
                cardNumber: '',
                expiryDate: '',
                cvv: ''
            },
            checking: {
                nameOnAccount: '',
                routingNumber: '',
                accountNumber: '',
                confirmAccountNumber: ''
            },
            mailingAddress: {
                address: '',
                apartment: '',
                city: '',
                state: 'Michigan',
                zip: ''
            },
            billingAddress: {
                address: '',
                apartment: '',
                city: '',
                state: 'Michigan',
                zip: ''
            }
        }
    });

    const stateTaxRates = {
        Michigan: 0.06,
    };

    const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://localhost:5000/api';
    const itemPrice = 10.99;
    const shippingCost = 2.99;
    const totalPrice = quantity * itemPrice;
    const tax = totalPrice * (stateTaxRates[watch('mailingAddress.state')] || 0);
    const totalBeforeTax = totalPrice + shippingCost;
    const totalWithTax = totalPrice + tax;
    const grandTotal = totalWithTax + shippingCost;

    const handleChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    // Watch mailing address for syncing with billing address
    const mailingAddress = watch('mailingAddress');

    useEffect(() => {
        if (checked) {
            Object.keys(mailingAddress).forEach(key => {
                setValue(`billingAddress.${key}`, mailingAddress[key]);
            });
        }
    }, [checked, mailingAddress, setValue]);

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            quantity,
            billingAddress: checked ? mailingAddress : data.billingAddress,
        };

        try {
            const response = await fetch(`${apiUrl}/checkout`, {
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

    return (
        <>
            <Navbar />
            <div className="checkout-top">
                <div className="checkout-left-imgs">
                    <img src={img_top} alt="straw-img-top" />
                    <img src={img_mid} alt="straw-img-mid" />
                    <img src={img_bottom} alt="straw-img-bottom" />
                    <img src={img_bottom} alt="straw-img-bottom" />
                </div>
                <div className="checkout-straws-img">
                    <img className="checkout-straws-img" src={straws_img} alt="straw-img-main" />
                </div>
                <div className="checkout-right-nav">
                    <p className="checkout-straws-title">Safety Straw (Color-Changing Drug Detection Straws)</p>
                    <div className="checkout-price">
                        <span className="checkout-currency">$</span>
                        <span className="checkout-amount">10</span>
                        <span className="checkout-cents">99</span>   
                    </div>

                    <select 
                        className="checkout-quantity-dropdown" 
                        id="quantity" 
                        name="quantity" 
                        value={quantity} 
                        onChange={handleChange}
                    >
                        {Array.from({ length: 10 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                Qty: {(index + 1) * 100} Pack
                            </option>
                        ))}
                    </select>
                    
                    <div className="continue-purchase">
                        <h1>
                            <a href="#checkout" className="purchase-link" onClick={smoothScroll}>
                                Continue to purchase
                            </a>
                        </h1>
                        <a href="#checkout" className="arrow-link" onClick={smoothScroll}>
                            <img src={arrow} alt="continue-arrow" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="checkout-bottom" id="checkout">
                <div className="payment-information">
                    <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Company Name (optional)"
                                {...register("companyName")}
                            />
                        </div>
                        <div className="checkout-input-group">
                            <input 
                                type="text" 
                                placeholder="Phone Number (optional)"
                                {...register("phoneNumber")}
                            />
                        </div>
                        
                        <h3>Pay With Card</h3>
                        <div className="checkout-input-group">
                            <input
                                type="text"
                                placeholder="Name on Card"
                                {...register("card.nameOnCard", { required: "Name on card is required" })}
                            />
                            {errors.card?.nameOnCard && <span className="error">{errors.card.nameOnCard.message}</span>}
                        </div>
                        <div className="checkout-input-group">
                            <input
                                type="text"
                                placeholder="Card Number"
                                {...register("card.cardNumber", { 
                                    required: "Card number is required",
                                    pattern: {
                                        value: /^[0-9]{16}$/,
                                        message: "Please enter a valid 16-digit card number"
                                    }
                                })}
                            />
                            {errors.card?.cardNumber && <span className="error">{errors.card.cardNumber.message}</span>}
                        </div>
                        <div className="checkout-input-group date-cvv">
                            <div className="half-width">
                                <input 
                                    type="text"
                                    placeholder="Ex. Date 00/00"
                                    {...register("card.expiryDate", {
                                        required: "Expiry date is required",
                                        pattern: {
                                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                                            message: "Please enter a valid date (MM/YY)"
                                        }
                                    })}
                                />
                                {errors.card?.expiryDate && <span className="error">{errors.card.expiryDate.message}</span>}
                            </div>
                            <div className="checkout-half-width">
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    {...register("card.cvv", {
                                        required: "CVV is required",
                                        pattern: {
                                            value: /^[0-9]{3,4}$/,
                                            message: "Please enter a valid CVV"
                                        }
                                    })}
                                />
                                {errors.card?.cvv && <span className="error">{errors.card.cvv.message}</span>}
                            </div>
                        </div>
                        
                        <h3>Pay With Checking Account</h3>
                        <div className="checkout-input-group">
                            <input
                                type="text"
                                placeholder="Name on Account"
                                {...register("checking.nameOnAccount")}
                            />
                        </div>
                        <div className="checkout-input-group">
                            <input
                                type="text"
                                placeholder="Routing Number"
                                {...register("checking.routingNumber", {
                                    pattern: {
                                        value: /^[0-9]{9}$/,
                                        message: "Please enter a valid 9-digit routing number"
                                    }
                                })}
                            />
                            {errors.checking?.routingNumber && <span className="error">{errors.checking.routingNumber.message}</span>}
                        </div>
                        <div className="checkout-input-group">
                            <input
                                type="text"
                                placeholder="Account Number"
                                {...register("checking.accountNumber")}
                            />
                        </div>
                        <div className="checkout-input-group">
                            <input
                                type="text"
                                placeholder="Confirm Account Number"
                                {...register("checking.confirmAccountNumber", {
                                    validate: value => 
                                        value === watch("checking.accountNumber") || 
                                        "Account numbers do not match"
                                })}
                            />
                            {errors.checking?.confirmAccountNumber && <span className="error">{errors.checking.confirmAccountNumber.message}</span>}
                        </div>
                        
                        <h3>Mailing Address</h3>
                        <div className="checkout-input-group">
                            <input
                                type="text"
                                placeholder="Address"
                                {...register("mailingAddress.address", { required: "Address is required" })}
                            />
                            {errors.mailingAddress?.address && <span className="error">{errors.mailingAddress.address.message}</span>}
                        </div>
                        <div className="checkout-input-group">
                            <input
                                type="text"
                                placeholder="Apartment, suite, etc."
                                {...register("mailingAddress.apartment")}
                            />
                        </div>
                        <div className="checkout-input-group city-state-zip">
                            <div className="half-width">
                                <input
                                    type="text"
                                    placeholder="City"
                                    {...register("mailingAddress.city", { required: "City is required" })}
                                />
                                {errors.mailingAddress?.city && <span className="error">{errors.mailingAddress.city.message}</span>}
                            </div>

                            <div className="select-wrapper">
                                <label className="select-label">State</label>
                                <select 
                                    {...register("mailingAddress.state")}
                                    className="select-field"
                                >
                                    <option value="Michigan">Michigan</option>
                                </select>
                            </div>
                            <div className="checkout-input-group">
                                <input
                                    type="text"
                                    placeholder="ZIP Code"
                                    {...register("mailingAddress.zip", {
                                        required: "ZIP code is required",
                                        pattern: {
                                            value: /^[0-9]{5}(-[0-9]{4})?$/,
                                            message: "Please enter a valid ZIP code"
                                        }
                                    })}
                                />
                                {errors.mailingAddress?.zip && <span className="error">{errors.mailingAddress.zip.message}</span>}
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
                        
                        {!checked && (
                            <>
                                <div className="checkout-input-group">
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        {...register("billingAddress.address", { required: "Address is required" })}
                                    />
                                    {errors.billingAddress?.address && <span className="error">{errors.billingAddress.address.message}</span>}
                                </div>
                                <div className="checkout-input-group">
                                    <input
                                        type="text"
                                        placeholder="Apartment, suite, etc."
                                        {...register("billingAddress.apartment")}
                                    />
                                </div>
                                <div className="checkout-input-group city-state-zip checkout-form-bottom-input">
                                    <div className="half-width">
                                        <input
                                            type="text"
                                            placeholder="City"
                                            {...register("billingAddress.city", { required: "City is required" })}
                                        />
                                        {errors.billingAddress?.city && <span className="error">{errors.billingAddress.city.message}</span>}
                                    </div>

                                    <div className="select-wrapper">
                                        <label className="select-label">State</label>
                                        <select 
                                            {...register("billingAddress.state")}
                                            className="select-field"
                                        >
                                            <option value="Michigan">Michigan</option>
                                        </select>
                                    </div>
                                    <div className="checkout-input-group">
                                        <input
                                            type="text"
                                            placeholder="ZIP Code"
                                            {...register("billingAddress.zip", {
                                                required: "ZIP code is required",
                                                pattern: {
                                                    value: /^[0-9]{5}(-[0-9]{4})?$/,
                                                    message: "Please enter a valid ZIP code"
                                                }
                                            })}
                                        />
                                        {errors.billingAddress?.zip && <span className="error">{errors.billingAddress.zip.message}</span>}
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                </div>
                <button className="place-order-mobile" type="submit" onClick={handleSubmit(onSubmit)}>
                        Place Your Order
                </button>
                {/* <button className="place-order-mobile" onClick={handleButtonClick}>Place Your Order</button> */}
                
                <div className="summary">
                    <div className="summary-info">
                        <div className="summary-line items">
                            <h1>Items ({quantity}):</h1>
                            <h1>${totalPrice.toFixed(2)}</h1>
                        </div>
                        <div className="summary-line shipping">
                            <h1>Shipping:</h1>
                            <h1>${shippingCost}</h1>
                        </div>
                        <div className="summary-line before-tax">
                            <h1>Total before tax:</h1>
                            <h1>${totalBeforeTax}</h1>
                        </div>
                        <div className="summary-line tax">
                            <h1>Tax:</h1>
                            <h1>${tax.toFixed(2)}</h1>
                        </div>
                        <hr className="black-line"/>
                        <div className="summary-line total">
                            <h1>Order total:</h1>
                            <h1>${grandTotal.toFixed(2)}</h1>
                        </div>
                    </div>
                    <button className="place-order" type="submit" onClick={handleSubmit(onSubmit)}>
                        Place Your Order
                    </button>
                    {/* <button className="place-order" onClick={handleButtonClick}>Place Your Order</button> */}

                </div>


            </div>



            <Footer></Footer>

        </>
    )
}
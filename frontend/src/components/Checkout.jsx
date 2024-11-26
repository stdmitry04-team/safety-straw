import Footer from "./footer";
import Navbar from "./nav";
import "../styles/Checkout.css";
import arrow from "../assets/checkout-arrow.svg";
import img_top from "../images/checkout-pic-top.png";
import img_mid from "../images/checkout-pic-mid.png";
import img_bottom from "../images/checkout-pic-bottom.png";
import straws_img from "../images/checkout-straws.png";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js"; // React components for Stripe
function calculateResponsiveFontSize() {
  const minFontSize = 14; // Minimum font size in px
  const maxFontSize = 28; // Maximum font size in px
  const viewportWidth = window.innerWidth;
  const fontSize = Math.min(
    Math.max(minFontSize, 0.015 * viewportWidth),
    maxFontSize
  );
  return `${fontSize}px`;
}

export default function Checkout() {
  const [quantity, setQuantity] = useState(1);
  const [checked, setChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [cardComplete, setCardComplete] = useState(null);
  const [intent, setIntent] = useState(null);
  const [fontSize, setFontSize] = useState(calculateResponsiveFontSize());
  const [paymentElement, setPaymentElement] = useState(null); // Store PaymentElement instance

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

  const paymentForm = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      phoneNumber: "",
      // card: {
      //   nameOnCard: "",
      // },
      // checking: {
      //   nameOnAccount: "",
      //   routingNumber: "",
      //   accountNumber: "",
      //   confirmAccountNumber: "",
      // },
      mailingAddress: {
        address: "",
        apartment: "",
        city: "",
        state: "Michigan",
        zip: "",
      },
      billingAddress: {
        address: "",
        apartment: "",
        city: "",
        state: "Michigan",
        zip: "",
      },
    },
  });
  // Watch for changes in payment fields
  // const cardFields = watch(["card.nameOnCard"]);
  // const checkingFields = watch([
  //   "checking.nameOnAccount",
  //   "checking.routingNumber",
  //   "checking.accountNumber",
  //   "checking.confirmAccountNumber",
  // ]);

  useEffect(() => {
    const getIntent = async () => {
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe failed to initialize.");
        return;
      }
      if (intent) {
        return;
      }
      try {
        const responseIntent = await fetch(
          `${baseUrl}/api/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: grandTotal }),
          }
        );

        if (responseIntent.ok) {
          console.log("Succesfully created payment intent");
          const { clientSecret } = await responseIntent.json();
          setIntent(clientSecret);
          const elements = stripe.elements({ clientSecret }); // Ensure this is correctly set up
          if (!elements) {
            console.error("Failed to initialize Stripe Elements.");
            return;
          }
          const PaymentElement = elements.create("payment");
          PaymentElement.mount("#payment-element");
          setPaymentElement(PaymentElement);
        } else {
          const error = await responseIntent.json();
          console.log("Failed to make payment intent");
          throw new Error(error);
        }
      } catch (error) {
        console.error("Error fetching payment intent:", error.message);
      }
    };
    getIntent();
  }, [intent]);

  // Update payment method when fields change
  useEffect(() => {
    // const hasCardInfo = cardComplete != null;
    // const hasCheckingInfo = checkingFields.some((field) => field);

    // if (hasCardInfo && !hasCheckingInfo) {
    //   setPaymentMethod("card");
    //   setPaymentError("");
    //   // Clear checking account fields
    //   Object.keys(watch("checking")).forEach((key) => {
    //     setValue(`checking.${key}`, "");
    //   });
    // } else if (hasCheckingInfo && !hasCardInfo) {
    //   setPaymentMethod("checking");
    //   setPaymentError("");
    //   // Clear card fields
    //   Object.keys(watch("card")).forEach((key) => {
    //     setValue(`card.${key}`, "");
    //   });
    // } else if (!hasCardInfo && !hasCheckingInfo) {
    //   setPaymentMethod("");
    // }
    const handleResize = () => {
      setFontSize(calculateResponsiveFontSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  //[...cardFields, ...checkingFields]

  // Validate that at least one payment method is fully filled out
  const validatePaymentMethod = () => {
    // const hasCompleteCardInfo = cardComplete;
    // const hasCompleteCheckingInfo = checkingFields.every((field) => field);
    // console.log(!hasCompleteCardInfo && !hasCompleteCheckingInfo);
    // if (!hasCompleteCardInfo && !hasCompleteCheckingInfo) {
    //   setPaymentError(
    //     "Please complete either card information or checking account information"
    //   );
    //   return false;
    // }

    // if (hasCompleteCardInfo && hasCompleteCheckingInfo) {
    //   setPaymentError("Please provide only one payment method");
    //   return false;
    // }

    setPaymentError("");
    return true;
  };

  const stateTaxRates = {
    Michigan: 0.06,
  };

  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const itemPrice = 10.99;
  const shippingCost = 2.99;
  const totalPrice = quantity * itemPrice;
  const tax = totalPrice * (stateTaxRates[watch("mailingAddress.state")] || 0);
  const totalBeforeTax = totalPrice + shippingCost;
  const totalWithTax = totalPrice + tax;
  const grandTotal = totalWithTax + shippingCost;

  const handleChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  // Watch mailing address for syncing with billing address
  const mailingAddress = watch("mailingAddress");

  const sendCardPayment = async (data) => {
    const responseIntent = await fetch(`${baseUrl}/api/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: grandTotal, type: "card" }),
    });
    if (responseIntent.ok) {
      console.log("Succesfully created payment intent");
    } else {
      const error = await responseIntent.json();
      console.log("Failed to make payment intent");
      throw new Error(error);
    }
    const dataIntent = await responseIntent.json();
    const paymentIntentSecret = dataIntent.clientSecret;
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      paymentIntentSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );
    if (error) {
      throw new Error(error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Payment successful");

      delete data.checking;
      const formData = {
        ...data,
        quantity,
        billingAddress: checked ? mailingAddress : data.billingAddress,
        grandTotal,
        paymentIntent: paymentIntent.id,
      };
      console.log(formData);
      const responsePayment = await fetch(`${baseUrl}/api/store-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }
  };

  const sendCheckingAccountPayment = async (data) => {
    const responseIntent = await fetch(`${baseUrl}/api/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: grandTotal, type: "checking" }),
    });
    const { clientSecret } = await responseIntent.json();

    const result = await stripe.confirmSetup({
      clientSecret: clientSecret,
      payment_method: {
        type: "us_bank_account", // Specify the type of payment method
        us_bank_account: {
          account_number: data.checking.accountNumber,
          routing_number: data.checking.routingNumber,
          account_holder_type: "individual", // 'individual' or 'company'
        },
        // billing_details: {
        //   name: 'John Doe', // Optional but recommended
        //   email: 'john.doe@example.com',
        // },
      },
      confirmParams: {
        return_url: import.meta.env.VITE_REG_URL, // Your app's URL for redirect after confirmation
      },
      redirect: "if_required", // Optional, prevents redirection if not needed
    });

    if (result.error) {
      console.error("Error confirming setup:", result.error.message);
    } else {
      console.log("Setup complete:", result.setupIntent.payment_method);
    }

    const chargeResponse = await fetch("/charge-bank-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethodId: "pm_xxx", // Replace with saved payment_method ID
        amount: grandTotal, // Amount in cents ($50.00)
      }),
    });

    const chargeResult = await chargeResponse.json();
    if (result.error) {
      console.error("Error charging bank account:", chargeResult.error);
    } else {
      console.log("Payment successful:", chargeResult);
    }
  };

  useEffect(() => {
    if (checked) {
      Object.keys(mailingAddress).forEach((key) => {
        setValue(`billingAddress.${key}`, mailingAddress[key]);
      });
    }
  }, [checked, mailingAddress, setValue]);

  const onSubmit = async (data) => {
    // Validate payment method before submission
    if (!validatePaymentMethod()) {
      return;
    }

    // // Trigger form validation
    // // const isValid = await trigger();
    // // if (!isValid) {
    // //   return;
    // // }

    try {
      //const elements = stripe.elements({ clientSecret: intent });
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe failed to initialize.");
        return;
      }
      const elements = stripe.elements({ intent }); // Ensure this is correctly set up
      console.log(elements);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Optionally define a return URL
          return_url: `${import.meta.env.VITE_REG_URL}/`,
        },
      });

      if (error) {
        console.log("error paying");
      } else {
        // Proceed with the payment submission
        console.log("Payment details are valid");
        // Optionally, send any necessary information to your backend
      }
    } catch (error) {}
  };

  const smoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.pushState("", "", targetId);
    }
  };

  // Modified register functions for payment fields
  const registerCardField = (fieldName, validation = {}) => {
    return register(`card.${fieldName}`, {
      ...validation,
      onChange: (e) => {
        if (paymentMethod === "checking") {
          // Clear checking account fields when card info is entered
          Object.keys(watch("checking")).forEach((key) => {
            setValue(`checking.${key}`, "");
          });
        }
      },
    });
  };

  const registerCheckingField = (fieldName, validation = {}) => {
    return register(`checking.${fieldName}`, {
      ...validation,
      onChange: (e) => {
        if (paymentMethod === "card") {
          // Clear card fields when checking info is entered
          Object.keys(watch("card")).forEach((key) => {
            setValue(`card.${key}`, "");
          });
        }
      },
    });
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
          <img
            className="checkout-straws-img"
            src={straws_img}
            alt="straw-img-main"
          />
        </div>
        <div className="checkout-right-nav">
          <p className="checkout-straws-title">
            Safety Straw (Color-Changing Drug Detection Straws)
          </p>
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
              <a
                href="#checkout"
                className="purchase-link"
                onClick={smoothScroll}
              >
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
          <form
            className="checkout-form"
            onSubmit={handleSubmit(onSubmit)}
            ref={paymentForm}
          >
            <div className="input-group">
              <input
                id="company-name"
                type="text"
                placeholder="Company Name (optional)"
                {...register("companyName")}
              />
            </div>
            <div className="checkout-input-group">
              <input
                id="company-phone"
                type="tel"
                placeholder="Phone Number (optional)"
                {...register("phoneNumber", {
                  pattern: {
                    value:
                      /^(\+\d{1,3}[-.]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber.message}</span>
              )}
            </div>
            <h3>Payment Information</h3>
            <div id="payment-element"></div>
            <h3>Mailing Address</h3>
            <div className="checkout-input-group">
              <input
                id="mailing-address"
                type="text"
                placeholder="Address"
                {...register("mailingAddress.address", {
                  required: "Address is required",
                })}
              />
              {errors.mailingAddress?.address && (
                <span className="error">
                  {errors.mailingAddress.address.message}
                </span>
              )}
            </div>
            <div className="checkout-input-group">
              <input
                id="mailing-unit"
                type="text"
                placeholder="Apartment, suite, etc."
                {...register("mailingAddress.apartment")}
              />
            </div>
            <div className="checkout-input-group city-state-zip">
              <div className="half-width">
                <input
                  id="mailing-city"
                  type="text"
                  placeholder="City"
                  {...register("mailingAddress.city", {
                    required: "City is required",
                  })}
                />
                {errors.mailingAddress?.city && (
                  <span className="error">
                    {errors.mailingAddress.city.message}
                  </span>
                )}
              </div>

              <div className="select-wrapper">
                <label className="select-label">State</label>
                <select
                  {...register("mailingAddress.state")}
                  className="select-field"
                >
                  <option value="Michigan" id="mailing-state">
                    Michigan
                  </option>
                </select>
              </div>
              <div className="checkout-input-group">
                <input
                  type="text"
                  id="mailing-zip"
                  placeholder="ZIP Code"
                  {...register("mailingAddress.zip", {
                    required: "ZIP code is required",
                    pattern: {
                      value: /^[0-9]{5}(-[0-9]{4})?$/,
                      message: "Please enter a valid ZIP code",
                    },
                  })}
                />
                {errors.mailingAddress?.zip && (
                  <span className="error">
                    {errors.mailingAddress.zip.message}
                  </span>
                )}
              </div>
            </div>

            <h3 className="checkout-billing">Billing Address</h3>
            <div className="checkbox-group">
              <button
                onClick={() => setChecked(!checked)}
                className={`custom-checkbox ${checked ? "checked" : ""}`}
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
                    id="billing-address"
                    type="text"
                    placeholder="Address"
                    {...register("billingAddress.address", {
                      required: "Address is required",
                    })}
                  />
                  {errors.billingAddress?.address && (
                    <span className="error">
                      {errors.billingAddress.address.message}
                    </span>
                  )}
                </div>
                <div className="checkout-input-group">
                  <input
                    id="billing-unit"
                    type="text"
                    placeholder="Apartment, suite, etc."
                    {...register("billingAddress.apartment")}
                  />
                </div>
                <div className="checkout-input-group city-state-zip checkout-form-bottom-input">
                  <div className="half-width">
                    <input
                      id="billing-city"
                      type="text"
                      placeholder="City"
                      {...register("billingAddress.city", {
                        required: "City is required",
                      })}
                    />
                    {errors.billingAddress?.city && (
                      <span className="error">
                        {errors.billingAddress.city.message}
                      </span>
                    )}
                  </div>

                  <div className="select-wrapper">
                    <label className="select-label">State</label>
                    <select
                      {...register("billingAddress.state")}
                      className="select-field"
                    >
                      <option value="Michigan" id="billing-state">
                        Michigan
                      </option>
                    </select>
                  </div>
                  <div className="checkout-input-group">
                    <input
                      id="billing-zip"
                      type="text"
                      placeholder="ZIP Code"
                      {...register("billingAddress.zip", {
                        required: "ZIP code is required",
                        pattern: {
                          value: /^[0-9]{5}(-[0-9]{4})?$/,
                          message: "Please enter a valid ZIP code",
                        },
                      })}
                    />
                    {errors.billingAddress?.zip && (
                      <span className="error">
                        {errors.billingAddress.zip.message}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
        <button
          className="place-order-mobile"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
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
            <hr className="black-line" />
            <div className="summary-line total">
              <h1>Order total:</h1>
              <h1>${grandTotal.toFixed(2)} </h1>
            </div>
          </div>
          <button
            className="place-order"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Place Your Order
          </button>
          {/* <button className="place-order" onClick={handleButtonClick}>Place Your Order</button> */}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

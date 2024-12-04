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
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
function calculateResponsiveFontSize() {
  const minFontSize = 14;
  const maxFontSize = 28;
  const viewportWidth = window.innerWidth;
  const fontSize = Math.min(
    Math.max(minFontSize, 0.015 * viewportWidth),
    maxFontSize
  );
  return `${fontSize}px`;
}

export default function Checkout() {
  const [quantity, setQuantity] = useState(1);
  const [fontSize, setFontSize] = useState(calculateResponsiveFontSize());
  const [clientSecret, setClientSecret] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [error, setError] = useState("");
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const itemPrice = 10.99;
  const shippingCost = 9.99;

  useEffect(() => {
    let totalPrice = quantity * itemPrice;
    let tax = totalPrice * (stateTaxRates["Michigan"] || 0);
    let totalWithTax = totalPrice + tax;
    setGrandTotal(totalWithTax + shippingCost);
    console.log(totalWithTax + shippingCost);
  }, []);

  useEffect(() => {
    const getIntent = async () => {
      console.log("hit");
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe failed to initialize.");
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
          const { clientSecret } = await responseIntent.json();
          setClientSecret(clientSecret);
        } else {
          const error = await responseIntent.json();
          console.log("Failed to make payment intent");
          console.log(error);
          throw new Error(error);
        }
      } catch (error) {
        console.error("Error fetching payment intent:", error.message);
      }
    };

    if (clientSecret == null && grandTotal > 0) {
      getIntent();
      console.log(clientSecret);
    }
  }, [clientSecret, grandTotal]);

  useEffect(() => {
    const handleResize = () => {
      setFontSize(calculateResponsiveFontSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const stateTaxRates = {
    Michigan: 0.06,
  };

  // Watch mailing address for syncing with billing address

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

  const handleChange = (event) => {
    setQuantity(parseInt(event.target.value));
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

      {clientSecret == null && <p>Loading payment form...</p>}
      {clientSecret != null ? (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <CheckoutForm
            secret={clientSecret}
            formError={error}
            quantityProduct={quantity}
            paymentIdInitial={clientSecret.split("_secret")[0]}
          />
        </Elements>
      ) : (
        clientSecret == null && (
          <p>Failed to load payment form. Please try again.</p>
        )
      )}

      <Footer></Footer>
    </>
  );
}

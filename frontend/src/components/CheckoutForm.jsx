import "../styles/Checkout.css";
import React, { useState, useEffect, useRef } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";

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

export default function CheckoutForm({
  quantityProduct,
  secret,
  formError,
  paymentIdInitial,
}) {
  const [checked, setChecked] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [fontSize, setFontSize] = useState(calculateResponsiveFontSize());
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalBeforeTax, setTotalBeforeTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [paymentId, setPaymentId] = useState(null);
  const itemPrice = 10.99;
  const shippingCost = 2.99;

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
  const stateTaxRates = {
    Michigan: 0.06,
  };
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const mailingAddress = watch("mailingAddress");

  useEffect(() => {
    const totalPrice = quantityProduct * itemPrice;
    const tax =
      totalPrice * (stateTaxRates[watch("mailingAddress.state")] || 0);
    const totalBeforeTax = totalPrice + shippingCost;
    const totalWithTax = totalPrice + tax;
    setTax(tax);
    setTotalBeforeTax(totalBeforeTax);
    setTotalPrice(totalPrice);
    setGrandTotal(totalWithTax + shippingCost);
    setError(formError);
    setQuantity(quantityProduct);
    if (paymentId == null) {
      setPaymentId(paymentIdInitial);
      console.log(paymentIdInitial);
    }

    console.log(error);
  }, [quantityProduct, paymentIdInitial, error]);

  useEffect(() => {
    handleQuantityChange();
  }, [quantity]);

  useEffect(() => {
    const handleResize = () => {
      setFontSize(calculateResponsiveFontSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleQuantityChange = async () => {
    try {
      if (paymentId != null && grandTotal > 0) {
        console.log(grandTotal);
        console.log(quantity);
        const response = await fetch(`${baseUrl}/api/update-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: paymentId,
            newAmount: grandTotal * 100, // Stripe uses the smallest currency unit (e.g., cents)
          }),
        });

        if (response.ok) {
          const updatedIntent = await response.json();
          setError("");
          console.log("Updated PaymentIntent:", updatedIntent);
        } else {
          const error = await response.json();
          setError(
            "There has been a problem with the payment system. Please contact the support team."
          );
          console.error("Error updating PaymentIntent:", error);
        }
      }
    } catch (error) {
      console.error("Error calling update endpoint:", error.message);
    }
  };

  // Validate that at least one payment method is fully filled out
  const validatePaymentMethod = (event) => {
    console.log(event);
    if (event != null && event.complete) {
      setPaymentError("");
      return true;
    } else {
      setPaymentError(
        event.error
          ? event.error.message
          : "Payment Information is not filled completely"
      );
      return false;
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
    console.log(paymentError);
    if (paymentError != "") {
      return;
    }

    try {
      console.log("Submitting");
      console.log(stripe);
      if (!stripe) {
        console.error("Stripe failed to initialize.");
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${import.meta.env.VITE_REG_URL}`,
        },
        redirect: "if_required",
      });
      data.type = paymentIntent.payment_method_types[0];
      data.paymentIntent = secret;
      data.quantity = quantityProduct * 100;

      if (error) {
        console.log("error paying");
        console.log(error);
        setError(
          "Failed to confirm payment. Please try again or contact support team."
        );
      } else {
        // Proceed with the payment submission
        console.log("Payment details are valid");

        try {
          // Perform the fetch request first
          const responseIntent = await fetch(`${baseUrl}/api/store-order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: data }),
          });
          console.log(responseIntent.ok);
          if (!responseIntent.ok) {
            setError(
              "Failed to record the order. Please contact support team."
            );

            throw new Error("Failed to store order");
          } else {
            setError("");
            const responseData = await responseIntent.json();
            console.log("hit");
            window.location = `${import.meta.env.VITE_REG_URL}`;
          }
        } catch (err) {
          setError("Failed to record the order. Please contact support team.");
          console.log("Error in fetch request:", err);
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="checkout-bottom" id="checkout">
        <div className="payment-information">
          <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="checkout-input-group">
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
            <PaymentElement onChange={validatePaymentMethod} />

            <h3 className="checkout-mailing-address">Mailing Address</h3>
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
              <h1>Items ({quantityProduct}):</h1>
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
          {error != "" && (
            <p className="summary-info error-text-checkout">{error}</p>
          )}
        </div>
      </div>
    </>
  );
}

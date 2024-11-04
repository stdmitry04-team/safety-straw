const stripe = require("stripe")(process.env.STRIPE_PUBLIC); // Replace with your actual secret key

async function sendCardPayment(
  nameCompany,
  numberCompany,
  cardInfo,
  mailingInfo,
  billingInfo
) {
  const response = await fetch("/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      "Error fetching payment intent:",
      response.status,
      response.statusText
    );
  }
  const { clientSecret } = await response.json();
  console.log("Client secret:", clientSecret);

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: {
      number: cardInfo.cardNumber,
      exp_month: cardInfo.expMonth,
      exp_year: cardInfo.expYear,
      cvc: cardInfo.cardCVC,
    },
  });

  if (error) {
    console.log(error.message);
  }
}

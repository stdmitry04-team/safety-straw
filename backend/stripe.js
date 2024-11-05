const stripe = require("stripe")(process.env.STRIPE_SECRET); // for server-side use only
const baseUrl = process.env.BASE_URL;
async function sendCardPayment(
  paymentIntentSecret,
  productInfo,
  companyInfo,
  mailingInfo,
  billingInfo
) {
  console.log(paymentIntentSecret);
  // const cardElement = elements.create("card");
  // cardElement.mount("#card-element");
  // const { error, paymentIntent } = await stripe.confirmCardPayment(
  //   clientSecret,
  //   {
  //     payment_method: {
  //       card: cardElement,
  //     },
  //   }
  // );
  // if (error) {
  //   console.log(error.message);
  // }
  // console.log("Payment success");
}
module.exports = { sendCardPayment };

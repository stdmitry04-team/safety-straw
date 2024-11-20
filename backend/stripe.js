require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./database.env" });
const { connectDB, connectClient } = require("./connect.js");

const stripe = require("stripe")(process.env.STRIPE_SECRET); // for server-side use only
const baseUrl = process.env.BASE_URL;
async function sendCardPayment(
  paymentIntentSecret,
  personalInfo,
  orders,
  mailing,
  billing
) {
  try {
    const client = await connectClient();
    const db = connectDB(client);
    const collection = db.collection(process.env.ORDER_COLLECTION);

    const doc = {
      name:
        personalInfo.company_name != ""
          ? personalInfo.company_name
          : personalInfo.name,
      straw_quantity: orders.straw_quantity,
      merch_one_quantity: orders.merch_one_quantity,
      merch_two_quantity: orders.merch_two_quantity,
      mail_address: mailing.address,
      mail_unit: mailing.apartment,
      mail_city: mailing.mail_city,
      mail_state: mailing.state,
      mail_zip: mailing.zip,
      bill_address: billing.address,
      bill_unit: billing.apartment,
      bill_city: billing.mail_city,
      bill_state: billing.state,
      bill_zip: billing.zip,
      phone: personalInfo.phone,
      stripe_ref: paymentIntentSecret,
    };
    const result = await collection.insertOne(doc);
    await client.close();
  } catch (err) {
    console.error("Error inserting document:", err);
    throw new Error("Error saving order into DB");
  }
}
module.exports = { sendCardPayment };

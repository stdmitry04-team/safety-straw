const connect = require("./connect.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

//Expects a body of {[{name:<string>,id:<string>,price:<in usd>, quantity:<num>}]}
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const session = stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, async () => {});

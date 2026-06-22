import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
const app = express();

dotenv.config();

const stripe = new Stripe(process.env.secretKey);
app.get("/", () => {
  console.log("Server is healthy");
});

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  console.log(req.body);

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET,
    );
    console.log(event);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
  res.status(200).send("Webhook received");
});

app.listen(8000, () => {
  console.log("Server is running on ", 8000);
});

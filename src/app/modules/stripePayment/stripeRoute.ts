import express, { Application, Request, Response } from "express";
const stripe = require("stripe")(
  "sk_test_51OaJj1HpVhNtoUJSAdqDteHlWGWL4AZCX6pWxnqZtyJb54cTkzTmjJ6lAuJXz80tmTTcmqIaPZsIVDF4AV4pbPOq00WPK4qrqd"
);

const router = express.Router();
const app: Application = express();
app.use(express.json());

app.post("/create-payment-intent", async (req: Request, res: Response) => {
  try {
    const { price } = req.body;

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ error: "Invalid price" });
    }

    const amount = Math.round(price * 100);
    console.log(amount, "Amount in cents");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log("payment intent", paymentIntent);
    res.send({
      clientSecret: paymentIntent.clientSecret,
    });
  } catch (error) {
    console.error("Error creating payment intent", error);
    return res.status(500).json({ error: "Failed to create payment intent" });
  }
});

export const StripeRoutes = router;

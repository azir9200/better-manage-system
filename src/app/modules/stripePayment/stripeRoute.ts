import express, { Application, Request, Response, Router } from "express";
import stripe from "./stripe.config";

const app: Application = express();
const router = Router();

// router.post("/create-payment-intent", paymentController.createPaymentIntent);

// payment intent
app.post("/create-payment-intent", async (req: Request, res: Response) => {
  const { price } = req.body;
  const amount = parseInt(price * 100);
  console.log(amount, "amount inside the intent");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default router;

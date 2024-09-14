import stripe from "./stripe.config";

interface CreatePaymentIntentParams {
  amount: number; // Amount in cents
}

const createPaymentIntent = async ({ amount }: CreatePaymentIntentParams) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", 
    });

    return paymentIntent;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
};

export default {
  createPaymentIntent,
};

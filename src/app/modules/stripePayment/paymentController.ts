import { Request, Response } from 'express';
import paymentService from './paymentService';

const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await paymentService.createPaymentIntent({ amount });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createPaymentIntent,
};

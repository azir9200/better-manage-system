import { Request, Response } from "express";
import { paymentServices } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId, status } = req.query;

  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string
  );
  // res.redirect("https://imagine-redux-story.vercel.app/payment/success");
  res.redirect("http://localhost:5173/payment/success");
};

//if payment failed
const confirmationFailed = async (req: Request, res: Response) => {
  // res.redirect("https://imagine-redux-story.vercel.app/payment/failed");
  res.redirect("http://localhost:5173/payment/failed");
};
export const paymentController = {
  confirmationController,
  confirmationFailed,
};

import { query, Request, Response } from "express";
import { paymentServices } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {

  res.send(req.query.transactionId);
  const result = await paymentServices.confirmationService(
    req.query.transactionId as string
  );
   res.send(result)
};

export const paymentController = {
  confirmationController,
};

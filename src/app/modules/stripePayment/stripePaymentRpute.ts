import { Router } from "express";
import paymentController from "./paymentController";

const router = Router();

router.post("/create-payment-intent", paymentController.createPaymentIntent);

export default router;

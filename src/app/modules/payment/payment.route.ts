import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/confirmation/success", paymentController.confirmationController);
router.post("/confirmation/failed", paymentController.confirmationFailed);

export const PaymentRoutes = router;
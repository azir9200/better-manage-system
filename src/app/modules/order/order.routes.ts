import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

// Route to create an order
router.post("/create-order", orderController.createOrder);

export const orderRoutes = router;

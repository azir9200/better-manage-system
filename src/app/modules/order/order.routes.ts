import { Router } from "express";
import { orderController } from "./order.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../user/user.constant";

const router = Router();

// Route to create an order
router.post("/create",   auth(UserRole.admin, UserRole.user),  orderController.createOrder);

export const orderRoutes = router;

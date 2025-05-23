import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../user/user.constant";
import {
  createOrderController,
  GetAllController,
  GetSingleController,
  verifyController,
} from "./order.controller";

const router = Router();

// Route to create an order
router.post(
  "/create",
  auth(UserRole.admin, UserRole.user),
  createOrderController
);

router.get("/verify", auth(UserRole.admin, UserRole.user), verifyController);

router.get("/", auth(UserRole.admin), GetAllController);

router.get(
  "/personal",
  auth(UserRole.admin, UserRole.user),
  GetSingleController
);
export const orderRoutes = router;

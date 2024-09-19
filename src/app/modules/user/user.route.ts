import express from "express";
import zodValidateRequest from "../../middlewares/zodValidateRequest";
import { userValidations } from "./user.validation";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "./user.constant";

const router = express.Router();

router.post(
  "/register",
  zodValidateRequest(userValidations.userValidationSchema),
  userController.createUser
);

router.get(
  "/get-me",
  auth(UserRole.admin, UserRole.user),
  userController.getMe
);

export const userRoutes = router;

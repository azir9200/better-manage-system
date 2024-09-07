import express from "express";
import zodValidateRequest from "../../middlewares/zodValidateRequest";
import { userValidations } from "./user.validation";
import { userController } from "./user.controller";

const router = express.Router();

router.post(
  "/register",
  zodValidateRequest(userValidations.userValidationSchema),
  userController.createUser
);

export const userRoutes = router;

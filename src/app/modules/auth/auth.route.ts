import express from "express";
import zodValidateRequest from "../../middlewares/zodValidateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/login",
  zodValidateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser
);

export const authRoutes = router;

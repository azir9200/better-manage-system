import express from "express";
import { UserControllers } from "./user.controller";
import zodValidateRequest from "../../middlewares/zodValidateRequest";
import { UserValidations } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "./user.constant";

const router = express.Router();

// admin
router.post(
  "/create",
  // auth(UserRole.admin, UserRole.user),
  zodValidateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser
);

//update
router.put(
  "/:userId",
  zodValidateRequest(UserValidations.updateUserValidations),
  UserControllers.updateUser
);
router.get(
  "/get-user",
  auth(UserRole.admin, UserRole.user),
  UserControllers.getUser
);

export const UserRoutes = router;

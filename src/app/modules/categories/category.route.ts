import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../user/user.constant";
import { categoryController } from "./category.controller";

const router = express.Router();

router.post(
  "/create",
  // auth(UserRole.admin),
  categoryController.createCategory
);

router.get("/", categoryController.getAllCategory);

export const categoryRoutes = router;

import express from "express";
import { productController } from "./product.controller";
import zodValidateRequest from "../../middlewares/zodValidateRequest";
import { productValidation } from "./product.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.admin),
  zodValidateRequest(productValidation.productValidationSchema),
  productController.createProduct
);

router.get(
  "/",
  productController.getAllService
);

router.get("/:id", productController.getSingleService);

router.get("/:category", productController.getCategoryService);

router.put("/id",   auth(UserRole.admin,), productController.updateService);

router.delete("/id",   auth(UserRole.admin,), productController.deleteService);

export const productRoutes = router;

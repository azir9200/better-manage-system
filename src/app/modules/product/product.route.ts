import express from "express";
import { productController } from "./product.controller";
import zodValidateRequest from "../../middlewares/zodValidateRequest";
import { productValidation } from "./product.validation";

const router = express.Router();

router.post(
  "/create-product",
  zodValidateRequest(productValidation.productValidationSchema),
  productController.createProduct
);

router.get("/", productController.getAllService);

router.get("/:id", productController.getSingleService);

router.put("/id", productController.updateService);

router.delete("/id", productController.deleteService);

export const productRoutes = router;

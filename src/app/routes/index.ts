import { Router } from "express";
import { productRoutes } from "../modules/product/product.route";
import { authRoutes } from "../modules/auth/auth.route";
import { orderRoutes } from "../modules/order/order.routes";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { UserRoutes } from "../modules/user/user.route";
import { categoryRoutes } from "../modules/categories/category.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/product",
    route: productRoutes,
  },
   {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/order",
    route: orderRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

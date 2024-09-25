import { Router } from "express";
import { productRoutes } from "../modules/product/product.route";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { orderRoutes } from "../modules/order/order.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/order",
    route: orderRoutes,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

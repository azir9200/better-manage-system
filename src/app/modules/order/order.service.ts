import mongoose from "mongoose";
import { OrderModel } from "./order.model";
import { TUser } from "../user/user.interface";
import { ProductModel } from "../product/product.model";

const createOrderIntoDB = async (orderData: any) => {
  const { user, products } = orderData;
  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item: any) => {
      const product = await ProductModel.findById(
        new mongoose.Types.ObjectId(item.product)
      );
     
    })
  );

  const transactionId = `TXN-${Date.now()}`;

  const order = new OrderModel({
    user,
    products: productDetails,
    totalPrice,
    status: "Pending",
    paymentStatus: "Pending",
    transactionId,
  });

  await order.save();

  return order;
};

export const orderService = {
  createOrderIntoDB,
};

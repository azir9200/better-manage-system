import { initiatePayment } from "../payment/payment.utils";
import { ProductModel } from "../product/product.model";
import { User } from "../user/user.model";
// import { userModel } from "../user/user.model";
import Order from "./order.model";

const createOrder = async (orderData: any) => {
  const { user, products } = orderData;

  let totalPrice = 0;

  // Calculate the total price
  const productDetails = await Promise.all(
    products.map(async (item: any) => {
      const product = await ProductModel.findById(item.product);
      if (product) {
        totalPrice += product.price * item.quantity;
        await User.findOneAndUpdate(
          { _id: user._id },
          {
            $push: { cart: { $each: products } },
          }
        );
        return {
          product: product._id,
          quantity: item.quantity,
        };
      } else {
        throw new Error("Product not found");
      }
    })
  );

  const transactionId = `TXN-${Date.now()}`;

  const order = await Order.create({
    user: user,
    products: productDetails,
    totalPrice,
    transactionId,
  });

  const paymentData = {
    transactionId,
    totalPrice: order.totalPrice,
    customerName: user.name,
    customerEmail: user.email,
  };

  //payment
  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

export const orderService = {
  createOrder,
};

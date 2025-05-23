import { OrderProduct } from "./order.interface";
import { OrderModels } from "./order.model";
import { orderUtils } from "./order.utils";
const CreateOrderService = async (
  Order: any,
  client_ip: string | undefined,
  email: string
) => {
  const { billingData, products, totalAmount } = Order;
  const order = {
    name: billingData.firstName + " " + billingData.lastName,
    email: email,
    phone: billingData.phone,
    shippingAddress: billingData.address,
    townOrCity: billingData.city,
    totalPrice: totalAmount,
    products: products.map((p: OrderProduct) => ({
      productId: p._id,
      quantity: p.quantity,
      price: p.price,
    })),
    status: "Pending",
  };
  console.log(order);
  let orders = await OrderModels.create(order);

  const shurjopayPayload = {
    amount: totalAmount,
    order_id: orders._id,
    currency: "BDT",
    customer_name: orders.name,
    customer_address: orders.shippingAddress,
    customer_email: orders.email,
    customer_phone: orders.phone,
    customer_city: orders.townOrCity,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    const updatedOrder = await OrderModels.findByIdAndUpdate(
      orders._id,
      {
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      },
      { new: true }
    );

    if (updatedOrder) {
      orders = updatedOrder;
    } else {
      console.error("Order not found or could not be updated");
    }
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    const order = await OrderModels.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status === "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status === "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status === "Cancel"
            ? "Cancelled"
            : "",
      },
      { new: true }
    );
  }

  return verifiedPayment;
};

const getAllOrder = async () => {
  const result = await OrderModels.find();
  return result;
};
const getSingleOrder = async (userEmail: string) => {
  console.log(userEmail);
  const result = await OrderModels.find({
    email: userEmail,
  });
  return result;
};
export const orderService = {
  CreateOrderService,
  verifyPayment,
  getAllOrder,
  getSingleOrder,
};

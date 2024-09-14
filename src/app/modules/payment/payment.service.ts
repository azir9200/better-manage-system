import orderModel from "../order/order.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  console.log(verifyResponse);

  let result;
  let message = "";

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await orderModel.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
      }
    );
    message = "Successfully Paid!";
  } else {
    message = "Payment Failed!";
  }

  //   return result;
};
export const paymentServices = {
  confirmationService,
};

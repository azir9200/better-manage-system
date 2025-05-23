import { OrderModels } from "../order/order.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    await OrderModels.findOneAndUpdate(
      {
        transactionId,
      },
      {
        paymentStatus: "Paid",
      }
    );
  }
  return `<h2> Payment azir ${status} </h2>`;
};

export const paymentServices = {
  confirmationService,
};

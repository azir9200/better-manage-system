import dotenv from "dotenv";
import Shurjopay, { PaymentResponse, VerificationResponse } from "shurjopay";
dotenv.config();

const shurjopay = new Shurjopay();

shurjopay.config(
  process.env.SP_ENDPOINT!,
  process.env.SP_USERNAME!,
  process.env.SP_PASSWORD!,
  process.env.SP_PREFIX!,
  process.env.SP_RETURN_URL!
);

// console.log(shurjopay);

const makePaymentAsync = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentPayload: any
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolve(response),
      (error) => reject(error)
    );
  });

  //   const paymentResult = await shurjopay.makePayment(
  //     paymentPayload,
  //     (response) => {
  //       sendResponse(res, {
  //         statusCode: 200,
  //         message: "Order placed successfully",
  //         data: response,
  //       });
  //     },
  //     (error) => console.log(error)
  //   );
  //   return paymentResult;
};

const verifyPaymentAsync = (
  order_id: string
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => reject(error)
    );
  });
};

export const orderUtils = {
  makePaymentAsync,
  verifyPaymentAsync,
};

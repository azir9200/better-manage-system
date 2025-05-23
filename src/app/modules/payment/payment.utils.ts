import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData: any) => {
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,

    success_url: `https://imagine-redux-story.vercel.app/api/payment/confirmation/success?transactionId=${paymentData.transactionId}&status=success`,

    fail_url: `https://imagine-redux-story.vercel.app/api/payment/confirmation/failed?status=failed`,

    cancel_url: "https://imagine-redux-story.vercel.app",

    // success_url: `http://localhost:5000/api/payment/confirmation/success?transactionId=${paymentData.transactionId}&status=success`,
    // fail_url: `http://localhost:5000/api/payment/confirmation/failed?status=failed`,
    // cancel_url: "http://localhost:5173/",
    amount: paymentData.totalPrice,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_add1: "N/A",
    cus_name: "N/A",
    cus_email: paymentData.customerEmail,
    // cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: "N/A",
    type: "json",
  });
  console.log("Response", response);
  console.log("Response url azir", response.data.success_url);
  return response.data;
};

// verify payment
export const verifyPayment = async (tnxId: string) => {
  const response = await axios.get(config.verify_url!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: "json",
      request_id: tnxId,
    },
  });
  return response.data;
};
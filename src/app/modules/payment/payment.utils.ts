import axios from "axios";

export const initiatePayment = async () => {
  const response = await axios.post(process.env.PAYMENT_URL!, {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    tran_id: "paymentData.transactionId",
    success_url: `http://localhost:3000/api/v1/payment/confirmation?transactionId="{paymentData.transactionId}"&status=success`,
    fail_url: `http://localhost:3000/api/v1/payment/confirmation?status=failed`,
    cancel_url: "http://localhost:5173/",
    amount: "10",
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: "Customer Name",
    cus_email: "customer@test.com",
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: "paymentData.customerPhone",
    type: "json",
  });
  console.log("Response  now ", response);
};

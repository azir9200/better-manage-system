import mongoose, { Types } from "mongoose";
export type TOrder = {
  user: Types.ObjectId;
  
  products: Array<{
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }>;

  totalPrice: number;
  status: string;
  paymentStatus: string;
  transactionId: string;
};

import { Types } from "mongoose";


export type PaymentRequest = {
  price: string;
  // userId: Types.ObjectId;
  // productId: Types.ObjectId;
  // status?: string;
};

export type PaymentDocument = {
  userId: string;
  productId: string;
  amount: number;
  currency: string;
  status: string;
  paymentIntentId: string;
  createdAt: Date;
};

import mongoose, { Document, Schema } from "mongoose";
import { OrderInterface } from "./order.interface";

interface OrderDoc extends OrderInterface, Document {}

const OrderSchema = new Schema<OrderDoc>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    townOrCity: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending",
    },
    transaction: {
      id: { type: String },
      transactionStatus: { type: String },
      bank_status: { type: String },
      sp_code: { type: String },
      sp_message: { type: String },
      method: { type: String },
      date_time: { type: String },
    },
  },
  { timestamps: true }
);

export const OrderModels = mongoose.model<OrderDoc>("Orders", OrderSchema);
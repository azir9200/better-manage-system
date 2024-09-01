import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
});

export const ProductModel = model<TProduct>("Product", productSchema);

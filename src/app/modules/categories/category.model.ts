import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      validate: {
        validator: Number.isInteger,
        message: "Stock must be an integer",
      },
    },
    image: { type: String },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);

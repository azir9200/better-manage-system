import { z } from "zod";

export const productValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Product name is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    stockQuantity: z
      .number()
      .int()
      .min(0, { message: "Stock quantity must be a non-negative integer" }),
    description: z.string().min(1, { message: "Description is required" }),
    images: z.array(
      z.string().url({ message: "Each image must be a valid URL" })
    ),
    category: z.string().min(1, { message: "Category is required" }),
  }),
});

export const productValidation = {
  productValidationSchema,
};

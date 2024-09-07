import { z } from "zod";

export const productValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be positive"),
    category: z.string().min(1, "Category is required"),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
    image: z.string().url("A valid image URL is required"),
  }),
});

export const productValidation = {
  productValidationSchema,
};

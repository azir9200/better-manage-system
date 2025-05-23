import { z } from "zod";

export const orderValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    products: z
      .array(
        z.object({
          product: z.string().min(1, { message: "Product ID is required" }),
          quantity: z
            .number()
            .int()
            .positive({ message: "Quantity must be a positive integer" }),
        })
      )
      .min(1, { message: "At least one product is required" }),
    totalPrice: z
      .number()
      .positive({ message: "Total price must be a positive number" }),
    status: z
      .enum(["Pending", "Paid", "Shipped", "Completed", "Cancelled"])
      .default("Pending"),
    paymentStatus: z.enum(["Pending", "Paid", "Failed"]).default("Pending"),
    transactionId: z.string().min(1, { message: "Transaction ID is required" }),
  }),
});

export const orderValidation = {
  orderValidationSchema,
};
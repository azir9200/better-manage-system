import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
    phone: z.string(),
    address: z.string(),
    role: z.enum(["user", "admin"]).optional(),
  }),
});

const updateUserValidations = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    roll: z.string().optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidations,
};

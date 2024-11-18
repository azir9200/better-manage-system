import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
    role: z.enum(["user", "admin"]).optional(),
  }),
});

const updateUserValidations = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    roll: z.string().optional(),
  }),
});

export const userValidations = {
  userValidationSchema,
  updateUserValidations,
};

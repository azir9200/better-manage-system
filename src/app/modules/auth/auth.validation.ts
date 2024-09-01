import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
const changePasswordValidationSchema = z.object({
  currentPassword: z.string({ required_error: "Old Password is required!" }),
  newPassword: z.string({ required_error: "Please enter your password!" }),
});

export const authValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
};

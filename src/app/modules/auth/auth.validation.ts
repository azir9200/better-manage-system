import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({ required_error: 'Password is required' }),
    // address: z.string({ required_error: 'address is required' }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const authValidations = {
  registerValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
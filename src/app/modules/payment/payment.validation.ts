import { z } from 'zod';

export const PaymentValidation = z.object({
  price: z.number().positive(),
  userId: z.string().nonempty(),
  productId: z.string().nonempty(),
});

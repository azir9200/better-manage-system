
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  stock: z.number().int().min(0),
  image: z.string().url(),
  featured: z.boolean().optional(), 
});

export const updateProductSchema = createProductSchema.partial(); 

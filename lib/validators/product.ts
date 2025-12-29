import { z } from "zod";
import { CATEGORIES } from "@/lib/constants/categories";

export const ProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().min(0),
  stock: z.number().min(0),
  category: z.enum(CATEGORIES as [string, ...string[]]),
  images: z.array(z.string().url()).optional(),
});

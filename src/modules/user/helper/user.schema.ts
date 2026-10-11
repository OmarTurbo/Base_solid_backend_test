import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  email: z.string().email("Invalid email format").optional(),
  role: z.enum(["admin", "user"]).optional(),
  type: z.enum(["male", "female"]).optional(),
});
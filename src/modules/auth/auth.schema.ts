import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
});

export const signUpSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6).max(100),
  type: z.enum(["male", "female"]),
});
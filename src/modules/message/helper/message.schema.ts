import { z } from "zod";

export const messageSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .min(1, "First name cannot be empty"),

  lastName: z
    .string({ error: "Last name is required" })
    .min(1, "Last name cannot be empty"),

  email: z
    .string({ error: "Email is required" })
    .email("Invalid email format"),  

  message: z
    .string({ error: "Message is required" })
    .min(1, "Message cannot be empty"),

  nationality: z
    .string({ error: "Nationality is required" })
    .min(1, "Nationality cannot be empty"),

  phone: z
    .string({ error: "Phone is required" })
    .regex(
      /^(?:(?:\+20|0020|0)?1[0125]\d{8}|(?:\+966|00966|0)?5\d{8}|(?:\+971|00971|0)?5\d{7,8})$/,
      "Invalid phone number format"
    ),
});

export const replySchema = z.object({
  reply: z
    .string({ error: "Reply is required" })
    .trim()
    .min(1, "Reply cannot be empty")
    .max(5000, "Reply cannot exceed 5000 characters"),
});

export type MessageInput = z.infer<typeof messageSchema>;
export type ReplyInput = z.infer<typeof replySchema>;

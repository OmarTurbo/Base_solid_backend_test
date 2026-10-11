import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET_KEY: z.string().min(32, "JWT_SECRET_KEY must be at least 32 characters"),
  JWT_EXPIRY_DATE: z.string().min(1, "JWT_EXPIRY_DATE is required"),
  cookieMaxAgeMs: z.string().min(1, "cookieMaxAgeMs is required"),
  ALLOWED_ORIGINS: z.string().min(1, "ALLOWED_ORIGINS is required"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  ADMIN_USERNAME: z.string().min(1, "ADMIN_USERNAME is required"),
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email").min(1, "ADMIN_EMAIL is required"),
  ADMIN_PASSWORD: z.string().min(8, "ADMIN_PASSWORD must be at least 8 characters").min(1, "ADMIN_PASSWORD is required"),
  ADMIN_TYPE: z.string().min(1, "ADMIN_TYPE is required"),
  ROLE: z.string().min(1, "ROLE is required")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
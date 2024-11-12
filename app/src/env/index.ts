import { z } from "zod";

const envSchema = z.object({
  SESSION_SECRET: z
    .string()
    .trim()
    .min(15)
    .default("session_password_is_session_password"),
  DATABASE_URL: z.string().trim().min(1),

  // disabled since am using prisma
  // XATA_POSTGRESQL_ENDPOINT: z.string().trim().min(1),
  // XATA_HTTP_ENDPOINT: z.string().trim().min(1),
  // XATA_API_KEY: z.string().trim().min(1),

  UPSTASH_REDIS_REST_URL: z.string().trim().min(1),
  UPSTASH_REDIS_REST_TOKEN: z.string().trim().min(1),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const env = envSchema.parse(import.meta.env);

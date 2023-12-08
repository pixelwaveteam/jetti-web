import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().min(1),
  API_URL: z.string().min(1),
  NEXTAUTH_URL: z.string().min(1),
  NEXTAUTH_DEBUG: z.coerce.boolean().default(false),
});

export const env = envSchema.parse(process.env);

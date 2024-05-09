import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
  },
  client: {
    //
  },
  shared: {
    //
    OKX_API_KEY: z.string(),
    OKX_API_SECRET: z.string(),
    OKX_API_PASSPHRASE: z.string(),
  },
  runtimeEnv: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    OKX_API_KEY: process.env.NEXT_PUBLIC_OKX_API_KEY,
    OKX_API_SECRET: process.env.NEXT_PUBLIC_OKX_API_SECRET,
    OKX_API_PASSPHRASE: process.env.NEXT_PUBLIC_OKX_API_PASSPHRASE,
  },
});

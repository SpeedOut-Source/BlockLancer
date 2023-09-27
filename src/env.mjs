import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url(),
    ),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    apiKey: z.string(),
    authDomain: z.string(),
    projectId: z.string(),
    storageBucket: z.string(),
    messagingSenderId: z.string(),
    appId: z.string(),
    clientId: z.string(),
    clientSecret: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    NEXT_PUBLIC_LOG_ENABLE: z
      .string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true"),
    NEXT_PUBLIC_STELLAR_ACCOUNT_URL: z.string(),
    NEXT_PUBLIC_WALLET_CONNECT_ID: z.string(),
    NEXT_PUBLIC_TITLE: z.string(),
    NEXT_PUBLIC_DESC: z.string(),
    NEXT_PUBLIC_URL: z.string(),
    NEXT_PUBLIC_ICON: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_LOG_ENABLE: process.env.NEXT_PUBLIC_LOG_ENABLE,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    NEXT_PUBLIC_STELLAR_ACCOUNT_URL:
      process.env.NEXT_PUBLIC_STELLAR_ACCOUNT_URL,
    NEXT_PUBLIC_WALLET_CONNECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
    NEXT_PUBLIC_TITLE: process.env.NEXT_PUBLIC_TITLE,
    NEXT_PUBLIC_DESC: process.env.NEXT_PUBLIC_DESC,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_ICON: process.env.NEXT_PUBLIC_ICON,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

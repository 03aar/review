import { createAuthClient } from "better-auth/react"

// Always use the browser's actual origin for auth requests.
// This ensures auth works on any domain: localhost, Vercel previews, custom domains.
// NEXT_PUBLIC_APP_URL is only used as a fallback for SSR/build contexts where window is unavailable.
const resolvedURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const authClient = createAuthClient({
  baseURL: resolvedURL,
})

export const { signIn, signUp, signOut, useSession } = authClient

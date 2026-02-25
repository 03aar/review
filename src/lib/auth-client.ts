import { createAuthClient } from "better-auth/react"

const baseURL = process.env.NEXT_PUBLIC_APP_URL

if (!baseURL && typeof window !== "undefined") {
  console.error(
    "NEXT_PUBLIC_APP_URL is not set. Auth will not work correctly. Check your .env file."
  )
}

// In production, NEXT_PUBLIC_APP_URL must be set at build time.
// In development, fall back to window.location.origin (not hardcoded localhost).
const resolvedURL =
  baseURL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000")

export const authClient = createAuthClient({
  baseURL: resolvedURL,
})

export const { signIn, signUp, signOut, useSession } = authClient

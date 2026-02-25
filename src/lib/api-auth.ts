import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

type SessionResult = Awaited<ReturnType<typeof auth.api.getSession>>

/**
 * Get the authenticated session from the request headers.
 * Returns null if the user is not authenticated.
 */
export async function getAuthSession(req: NextRequest): Promise<SessionResult | null> {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })
    return session
  } catch {
    return null
  }
}

/**
 * Require authentication for an API route.
 * Returns the session or a 401 response.
 */
export async function requireAuth(
  req: NextRequest
): Promise<
  | { session: NonNullable<SessionResult>; error?: never }
  | { session?: never; error: NextResponse }
> {
  const session = await getAuthSession(req)
  if (!session) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      ),
    }
  }
  return { session }
}

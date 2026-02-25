import { NextRequest, NextResponse } from "next/server"

const PROTECTED_ROUTES = ["/dashboard"]
const AUTH_ROUTES = ["/login", "/register"]

// Better Auth cookie names:
// - HTTP (localhost):  "better-auth.session_token"
// - HTTPS (production): "__Secure-better-auth.session_token"
const SESSION_COOKIE_NAMES = [
  "__Secure-better-auth.session_token",
  "better-auth.session_token",
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const sessionToken = SESSION_COOKIE_NAMES
    .map((name) => req.cookies.get(name)?.value)
    .find(Boolean)
  const isAuthenticated = !!sessionToken

  // Protected routes: redirect to login if not authenticated
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url)
    // Preserve full path + query so user returns to the exact page after login
    const returnTo = pathname + req.nextUrl.search
    loginUrl.searchParams.set("callbackUrl", returnTo)
    return NextResponse.redirect(loginUrl)
  }

  // Auth routes: redirect to dashboard if already authenticated
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
}

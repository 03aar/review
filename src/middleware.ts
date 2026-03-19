import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect all /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const sessionToken =
      req.cookies.get("better-auth.session_token")?.value ||
      req.cookies.get("__Secure-better-auth.session_token")?.value

    if (!sessionToken) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname === "/login" || pathname === "/register") {
    const sessionToken =
      req.cookies.get("better-auth.session_token")?.value ||
      req.cookies.get("__Secure-better-auth.session_token")?.value

    if (sessionToken) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}

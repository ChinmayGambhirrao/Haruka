import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith("/signin") || 
                    request.nextUrl.pathname.startsWith("/signup")

  // If trying to access auth pages while logged in, redirect to dashboard
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If trying to access protected routes while not logged in, redirect to signin
  const protectedRoutes = ["/dashboard", "/focus-room", "/tasks", "/notes", "/profile"]
  if (!isAuthenticated && protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    const signInUrl = new URL("/signin", request.url)
    // Preserve the original URL as the callback URL
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/focus-room/:path*",
    "/tasks/:path*",
    "/notes/:path*",
    "/profile/:path*",
    "/signin",
    "/signup",
  ],
}
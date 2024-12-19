import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSessionClient } from './lib/appwrite/appwrite'

export async function middleware(request: NextRequest) {
  try {
    const session = await createSessionClient();
    const { pathname } = request.nextUrl;
    const headers = new Headers(request.headers);
    headers.set("x-pathname", pathname);

    // Handle requests to the login and signup pages
    if (pathname === "/login" || pathname === "/signup") {
      if (session !== null) {
        return NextResponse.redirect(new URL("/dashboard/", request.nextUrl), { headers });  // Redirect if already logged in
      }
      return NextResponse.next({ headers });
    }

    // Handle dashboard and its subpages
    if (pathname.startsWith("/dashboard")) {
      if (session === null) {
        return NextResponse.redirect(new URL("/login", request.nextUrl), { headers });  // Redirect to login if not logged in
      }
      return NextResponse.next({ headers });
    }

    // Handle receipts API path (if needed)
    if (pathname.startsWith('/api/v1/storage/receipts')) {
      const id = pathname.split('/').filter(Boolean).pop() as string;
      headers.set("x-path", id);
      return NextResponse.next({ headers });
    }
    // Set login status header for other requests
    headers.set("x-is-login", session === null ? "false" : "true");
    return NextResponse.next({ headers });

  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.json({
      message: "Something went wrong",
      success: false
    }, { status: 500 });
  }
}

// Middleware matcher configuration
export const config = {
  matcher: [
    '/api/:path*',
    '/:path',
    "/",
    "/dashboard/:path*"
  ],
}
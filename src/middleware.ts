import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSessionClient } from './lib/appwrite/appwrite'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const session = await createSessionClient();
    if (request.nextUrl.pathname.startsWith('/api/v1/storage/receipts')) {
      console.log("running middleware")
      const headers = new Headers(request.headers)
      const id = request.nextUrl.pathname.split('/').filter(Boolean).pop() as string
      headers.set("x-path", id);
      return NextResponse.next({ headers })
    } else if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup") {
      // TODO: remove after debug
      console.log("running middleware on login/signup page")
      if (session === null) {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL("/dashboard/", request.nextUrl))
      }
    } else if (request.nextUrl.pathname === "/dashboard") {
      console.log("running middleware on dashboard page")
      if (session === null) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
      } else {
        return NextResponse.next()
      }
    }
    else {
      console.log("running else middleware")
      const headers = new Headers(request.headers)
      if (session === null) {
        headers.set("x-is-login", "false");
      } else {
        headers.set("x-is-login", "true");
      }
      return NextResponse.next({ headers })
    }
  } catch (error) {
    console.error("Errror in middlware", error)
    return NextResponse.json({
      message: "Something went wrong",
      success: false
    }, { status: 500 })
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/api/:path*',
    '/:path',
    "/"
  ],
}
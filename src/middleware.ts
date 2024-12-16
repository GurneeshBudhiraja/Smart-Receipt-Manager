import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname.startsWith('/api/v1/storage/receipts')) {
      console.log("running middleware")
      const headers = new Headers(request.headers)
      const pathName = request.nextUrl.pathname.split('/').filter(Boolean).pop() as string
      headers.set("x-path", pathName);
      return NextResponse.next({ headers })
    }
  } catch (error) {
    console.dir("Errror in middlware", error)
    return NextResponse.json({
      message: "Something went wrong",
      success: false
    }, { status: 500 })
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}
import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()

  // Add a custom header to indicate if this is the root route
  if (request.nextUrl.pathname === '/') {
    response.headers.set('x-is-root-route', 'true')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

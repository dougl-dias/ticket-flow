import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

const AUTH_ROUTES = ['/login']
const PUBLIC_ROUTES = ['/', '/login', '/esqueci-senha']
const PRIVATE_ROUTE_PREFIXES = ['/dashboard']

function isRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route)
}

function startsWithRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const isLoggedIn = Boolean(req.nextauth.token)
    const isAuthRoute = isRoute(pathname, AUTH_ROUTES)

    if (isAuthRoute && isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl

        if (isRoute(pathname, PUBLIC_ROUTES)) {
          return true
        }

        if (startsWithRoute(pathname, PRIVATE_ROUTE_PREFIXES)) {
          return Boolean(token)
        }

        return true
      }
    },
    pages: {
      signIn: '/login'
    }
  }
)

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)']
}

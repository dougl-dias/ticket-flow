import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const isLoggedIn = Boolean(req.nextauth.token)
    const isLoginPage = req.nextUrl.pathname === '/login'

    if (isLoginPage && isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === '/login') {
          return true
        }

        return Boolean(token)
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

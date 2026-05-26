import 'dotenv/config'

import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { compare } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const email = credentials?.email.trim().toLowerCase() ?? ''
        const password = credentials?.password ?? ''

        if (!email || !password) return null

        const findUser = await prisma.user.findUnique({
          where: { email }
        })

        if (!findUser) return null

        const passwordMatches = await compare(password, findUser.password)

        if (!passwordMatches) return null

        return {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          image: findUser.image
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = String(token.id)
      }
      return session
    }
  }
}

export default NextAuth(authOptions)

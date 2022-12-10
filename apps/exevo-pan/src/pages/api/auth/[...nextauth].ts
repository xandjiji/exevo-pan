/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth/next'
import type { BuiltInProviderType } from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'
import { prisma } from 'lib/prisma'
import { routes } from 'Constants'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: { params: { scope: 'email identify' } },
    }),
  ],
  callbacks: {
    jwt: ({ token, user, account }) => {
      if (!user || !account) return token

      const { id, proStatus, proSince, role } = user

      return {
        ...token,
        id,
        provider: account.provider as BuiltInProviderType,
        proStatus,
        proSince,
        role,
      }
    },
    session: async ({ session, token }) => {
      if (token.proStatus) {
        session.user = token
        return session
      }

      const paymentData = await prisma.paymentData.findFirst({
        where: { userId: token.id },
      })

      session.user = { ...token, paymentData }

      if (paymentData?.confirmed) {
        session.user.proStatus = true
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: routes.LOGIN,
  },
})

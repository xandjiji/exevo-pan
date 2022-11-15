/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth/next'
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

      const { id, proStatus, proSince, paymentData } = user
      const { provider } = account
      return { ...token, id, provider, proStatus, proSince, paymentData }
    },
    session: ({ session, token }) => {
      session.user = token

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: routes.LOGIN,
  },
})

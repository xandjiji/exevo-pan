/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth/next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'
import { prisma } from 'lib/prisma'
import { routes } from 'Constants'

export default NextAuth({
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
    session: ({ session, user }) => {
      session.user = user

      return session
    },
  },
  secret: process.env.JWT_SECRET as string,
  pages: {
    signIn: routes.LOGIN,
  },
})

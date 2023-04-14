import { z } from 'zod'
import { authedProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'

export const listMyTransactions = authedProcedure.query(
  async ({
    ctx: {
      token: { id },
    },
  }) =>
    prisma.transaction.findMany({
      where: { userId: id },
      include: { highlightedAuction: true, exevoProPayment: true },
      orderBy: { date: 'desc' },
    }),
)

export const listMyAuctionNotifications = authedProcedure.query(
  async ({
    ctx: {
      token: { id },
    },
  }) =>
    prisma.auctionNotification.findMany({
      where: { userId: id },
      orderBy: { lastUpdated: 'desc' },
    }),
)

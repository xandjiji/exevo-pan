import { z } from 'zod'
import { TRPCError } from '@trpc/server'
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

export const deleteMyAuctionNotification = authedProcedure
  .input(z.string())
  .mutation(async ({ ctx: { token }, input: auctionNotificationId }) => {
    const notificationToBeDeleted = await prisma.auctionNotification.findUnique(
      { where: { id: auctionNotificationId } },
    )

    if (!notificationToBeDeleted) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Auction notification not found',
      })
    }
    if (token.role !== 'ADMIN' && notificationToBeDeleted.userId !== token.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Insufficient privileges to delete this auction notification',
      })
    }

    return prisma.auctionNotification.delete({
      where: { id: auctionNotificationId },
    })
  })

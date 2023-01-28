import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { authedProcedure } from 'server/trpc'
import type { AuctionNotification } from '@prisma/client'
import { prisma } from 'lib/prisma'

const AuctionNotificationSchema: z.ZodType<
  Omit<AuctionNotification, 'id' | 'lastUpdated' | 'userId'>
> = z.object({
  auctionId: z.number(),
  nickname: z.string(),
  auctionEnd: z.date(),
  notifyAt: z.date().nullable(),
  notifyOnBid: z.boolean(),
})

export const registerAuctionNotification = authedProcedure
  .input(AuctionNotificationSchema)
  .mutation(
    async ({
      ctx: {
        token: { id, proStatus },
      },
      input: { notifyOnBid, auctionEnd, notifyAt, ...rest },
    }) => {
      if (notifyAt && auctionEnd < notifyAt) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }

      const result = await prisma.auctionNotification.create({
        data: {
          ...rest,
          auctionEnd,
          notifyAt,
          notifyOnBid: proStatus ? notifyOnBid : false,
          user: { connect: { id } },
        },
      })

      return result
    },
  )

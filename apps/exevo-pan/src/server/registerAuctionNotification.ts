import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { authedProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { MILLISECONDS_IN } from 'utils'

const Input = z.object({
  auctionId: z.number().min(0),
  nickname: z.string(),
  auctionEnd: z.number().min(0),
  notifyAt: z.boolean(),
  notifyOnBid: z.boolean(),
  timeMode: z.union([z.literal('minutes'), z.literal('hours')]),
  timeValue: z.number().min(0),
})

export type RegisterAuctionNotificationInput = z.infer<typeof Input>

export const registerAuctionNotification = authedProcedure
  .input(Input)
  .mutation(
    async ({
      ctx: {
        token: { id, proStatus },
      },
      input: {
        notifyAt,
        auctionEnd,
        timeMode,
        timeValue,
        notifyOnBid,
        ...rest
      },
    }) => {
      const auctionEndDate = new Date(auctionEnd * 1000)
      const notifyAtDate = new Date(
        +auctionEndDate -
          (timeMode === 'minutes'
            ? MILLISECONDS_IN.MINUTE
            : MILLISECONDS_IN.HOUR * timeValue),
      )

      if (notifyAt && auctionEndDate < notifyAtDate) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }

      const result = await prisma.auctionNotification.create({
        data: {
          ...rest,
          auctionEnd: auctionEndDate,
          notifyAt: notifyAt ? notifyAtDate : undefined,
          notifyOnBid: proStatus ? notifyOnBid : false,
          user: { connect: { id } },
        },
      })

      return result
    },
  )

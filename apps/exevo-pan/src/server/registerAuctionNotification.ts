import { z } from 'zod'
import { authedProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import {
  calculateDate,
  isNotificationDateValid,
} from 'modules/BazaarAuctions/components/AuctionsGrid/ExpandableCharacterCard/useAuctionNotifications'

const Input = z
  .object({
    auctionId: z.number().min(0),
    nickname: z.string(),
    auctionEnd: z.number().min(0),
    notifyAt: z.boolean(),
    notifyOnBid: z.boolean(),
    timeMode: z.union([z.literal('minutes'), z.literal('hours')]),
    timeValue: z.number().min(0),
  })
  .refine(
    ({ notifyAt, auctionEnd, timeMode, timeValue }) =>
      notifyAt
        ? isNotificationDateValid({ auctionEnd, timeMode, timeValue })
        : true,
    { message: 'INVALID_DATE' },
  )

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
      const { auctionEndDate, notifyAtDate } = calculateDate({
        auctionEnd,
        timeMode,
        timeValue,
      })

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

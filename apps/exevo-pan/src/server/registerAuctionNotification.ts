import { z } from 'zod'
import { authedProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import {
  calculateDate,
  isNotificationDateValid,
} from 'modules/BazaarAuctions/components/AuctionsGrid/useAuctionNotifications/utils'

export const registerAuctionNotification = authedProcedure
  .input(
    z
      .object({
        auctionId: z.number().min(0),
        nickname: z.string().min(1),
        auctionEnd: z.number().min(0),
        notifyAt: z.boolean(),
        notifyOnBid: z.boolean(),
        timeMode: z.union([z.literal('minutes'), z.literal('hours')]),
        timeValue: z.number().min(0),
      })
      .superRefine(
        ({ notifyOnBid, notifyAt, auctionEnd, timeMode, timeValue }, ctx) => {
          if (
            notifyAt &&
            !isNotificationDateValid({ auctionEnd, timeMode, timeValue })
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.invalid_date,
            })
          }

          if (!notifyOnBid && !notifyAt) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'NO_NOTIFICATIONS',
            })
          }
        },
      ),
  )
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
          scheduleCompleted: !notifyAt,
          user: { connect: { id } },
        },
      })

      return result
    },
  )

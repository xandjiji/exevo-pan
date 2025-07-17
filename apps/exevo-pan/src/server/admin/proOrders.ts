import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { calculateDiscountedExevoProPrice } from 'utils'
import { exevoPro } from 'Constants'
import type { PaymentData, User } from 'db/prisma/generated/client'

export const listProOrders = adminProcedure
  .input(
    z.object({
      pageSize: z.number().optional().default(30),
      pageIndex: z.number().optional().default(0),
      term: z.string().optional(),
    }),
  )
  .query(async ({ input: { pageSize, pageIndex, term } }) => {
    const textQuery = term ? { contains: term } : undefined

    const where = {
      OR: [
        { email: textQuery, paymentData: { isNot: null } },
        {
          paymentData: { character: textQuery },
        },
      ],
    }

    const [page, count] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { paymentData: { lastUpdated: 'desc' } },
        include: { paymentData: true },
        take: pageSize,
        skip: pageIndex * pageSize,
      }),
      prisma.user.count({ where }),
    ])

    return {
      page: (page ?? []) as Array<User & { paymentData: PaymentData }>,
      count,
    }
  })

export const updateProOrders = adminProcedure
  .input(
    z.object({
      id: z.string(),
      confirmed: z.boolean(),
      noBill: z.boolean(),
    }),
  )
  .mutation(async ({ input: { id, confirmed, noBill } }) => {
    const currentDate = new Date().toISOString()

    const payment = await prisma.paymentData.findUnique({
      where: { userId: id },
    })

    const isPix = !payment?.character

    const value = noBill
      ? 0
      : calculateDiscountedExevoProPrice(
          payment?.discountPercent ?? 0,
          isPix ? 'PIX' : 'TIBIA_COINS',
        )

    const [user, transaction] = await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: {
          proStatus: confirmed,
          proSince: confirmed ? currentDate : null,
          paymentData: {
            update: { confirmed, noBill },
          },
        },
      }),
      confirmed
        ? prisma.transaction.create({
            data: {
              value,
              currency: isPix ? 'BRL' : 'TIBIA_COINS',
              type: 'EXEVO_PRO',
              date: currentDate,
              user: { connect: { id } },
              exevoProPayment: { connect: { id: payment?.id } },
            },
          })
        : prisma.transaction.delete({
            where: { exevoProPaymentId: payment?.id },
          }),

      ...(payment?.referralUserId && !noBill
        ? [
            confirmed
              ? prisma.referralHistoryEntry.create({
                  data: {
                    userId: payment.referralUserId,
                    referredUserId: payment.userId,
                    value: exevoPro.referral.tcCommission,
                    type: 'COMMISSION',
                  },
                })
              : prisma.referralHistoryEntry.delete({
                  where: { referredUserId: payment.userId },
                }),
            prisma.referralTag.update({
              where: { userId: payment.referralUserId },
              data: {
                tcIn: confirmed
                  ? { increment: exevoPro.referral.tcCommission }
                  : { decrement: exevoPro.referral.tcCommission },
              },
            }),
          ]
        : []),
    ])

    return { user, transaction }
  })

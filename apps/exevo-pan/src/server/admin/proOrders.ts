import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import type { User, PaymentData } from '@prisma/client'

export const listProOrders = adminProcedure
  .input(
    z.object({
      pageSize: z.number().optional().default(30),
      pageIndex: z.number().optional().default(0),
      nickname: z.string().optional(),
    }),
  )
  .query(async ({ input: { pageSize, pageIndex, nickname } }) => {
    const [page, count] = await Promise.all([
      prisma.user.findMany({
        where: {
          paymentData: {
            isNot: undefined,
            character: { contains: nickname },
          },
        },
        orderBy: {
          paymentData: {
            lastUpdated: 'desc',
          },
        },
        include: { paymentData: true },
        take: pageSize,
        skip: pageIndex * pageSize,
      }),
      prisma.user.count({
        where: {
          paymentData: {
            isNot: undefined,
            character: { contains: nickname },
          },
        },
      }),
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
    }),
  )
  .mutation(async ({ input: { id, confirmed } }) => {
    const currentDate = new Date().toISOString()

    const payment = await prisma.paymentData.findUnique({
      where: { userId: id },
    })

    const [user, transaction] = await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: {
          proStatus: confirmed,
          proSince: confirmed ? currentDate : null,
          paymentData: {
            update: {
              confirmed,
            },
          },
        },
      }),
      confirmed
        ? prisma.transaction.create({
            data: {
              value: 250,
              currency: 'TIBIA_COINS',
              type: 'EXEVO_PRO',
              date: currentDate,
              user: { connect: { id } },
              exevoProPayment: { connect: { id: payment?.id } },
            },
          })
        : prisma.transaction.delete({
            where: { exevoProPaymentId: payment?.id },
          }),
    ])

    return { user, transaction }
  })

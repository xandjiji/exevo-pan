import { z } from 'zod'
import { premiumProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'

export const editCoupon = premiumProcedure
  .input(z.string().min(3).max(16))
  .mutation(async ({ ctx: { token }, input }) => {
    const result = await prisma.referralTag.upsert({
      where: { userId: token.id },
      create: { id: input, userId: token.id },
      update: { id: input },
    })

    return result
  })

export const setWithdrawCharacter = premiumProcedure
  .input(z.string().min(2))
  .mutation(async ({ ctx: { token }, input: withdrawCharacter }) => {
    const result = await prisma.referralTag.update({
      where: { userId: token.id },
      data: { withdrawCharacter },
    })

    return result
  })

export const getReferralTag = premiumProcedure.query(
  async ({ ctx: { token } }) => {
    const result = await prisma.referralTag.findUnique({
      where: { userId: token.id },
    })

    return result
  },
)

export const listMyReferralHistoryEntries = premiumProcedure
  .input(
    z.object({
      pageSize: z.number().optional().default(10),
      pageIndex: z.number().optional().default(0),
    }),
  )
  .query(({ ctx: { token }, input: { pageSize, pageIndex } }) =>
    prisma.referralHistoryEntry.findMany({
      where: { userId: token.id },
      orderBy: { createdAt: 'desc' },
      take: pageSize,
      skip: pageIndex * pageSize,
    }),
  )

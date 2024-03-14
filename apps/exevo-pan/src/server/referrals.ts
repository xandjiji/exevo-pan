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

export const requestWithdraw = premiumProcedure
  .input(z.string().min(2))
  .mutation(async ({ ctx: { token }, input: withdrawCharacter }) => {
    const result = await prisma.referralTag.update({
      where: { userId: token.id },
      data: { withdrawing: true, withdrawCharacter },
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

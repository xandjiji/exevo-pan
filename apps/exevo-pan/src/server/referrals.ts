import { z } from 'zod'
import { premiumProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { exevoPro } from 'Constants'
import { DiscordAdmin } from 'services/DiscordAdmin'

export const editReferralTag = premiumProcedure
  .input(
    z.object({
      coupon: z.string().min(3).max(16).optional(),
      withdrawCharacter: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx: { token }, input }) => {
    const result = await prisma.referralTag.upsert({
      where: { userId: token.id },
      create: {
        userId: token.id,
        discountPercent: exevoPro.referral.discountPercent,
        ...input,
      },
      update: { ...input },
    })

    if (input.withdrawCharacter) {
      await DiscordAdmin.shout({
        title: 'New withdraw',
        color: 13017599,
        description: `Character: ${result.withdrawCharacter} (${result.coupon})`,
      })
    }

    return { success: true, ...input }
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

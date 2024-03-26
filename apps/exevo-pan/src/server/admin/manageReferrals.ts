import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { TRPCError } from '@trpc/server'

export const getAllWithdrawRequests = adminProcedure.query(() =>
  prisma.referralTag.findMany({
    where: { tcIn: { gt: 0 }, withdrawCharacter: { not: '' } },
  }),
)

export const sendWithdraw = adminProcedure
  .input(
    z.object({
      tagId: z.string().min(1),
      tcOut: z.number().min(1),
    }),
  )
  .mutation(async ({ input: { tagId, tcOut } }) => {
    const referralTag = await prisma.referralTag.findUnique({
      where: { id: tagId },
    })

    if (!referralTag) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    const result = await prisma.$transaction([
      prisma.referralTag.update({
        where: { id: tagId },
        data: {
          tcOut: { increment: tcOut },
          tcIn: { decrement: tcOut },
          withdrawCharacter: '',
        },
      }),
      prisma.referralHistoryEntry.create({
        data: {
          userId: referralTag.userId,
          type: 'WITHDRAW',
          value: tcOut,
          withdrawnCharacter: referralTag.withdrawCharacter,
        },
      }),
    ])
    return result
  })

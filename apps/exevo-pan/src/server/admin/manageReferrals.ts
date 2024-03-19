import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'

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
      userId: z.string(),
    }),
  )
  .mutation(async ({ input: { tagId, tcOut, userId } }) => {
    const result = await prisma.$transaction([
      prisma.referralTag.update({
        where: { id: tagId },
        data: {
          tcOut: { increment: tcOut },
          tcIn: { decrement: tcOut },
        },
      }),
      prisma.referralHistoryEntry.create({
        data: { userId, type: 'WITHDRAW', value: tcOut },
      }),
    ])
    return result
  })

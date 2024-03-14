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
    }),
  )
  .mutation(async ({ input: { tagId, tcOut } }) => {
    const result = await prisma.referralTag.update({
      where: { id: tagId },
      data: {
        tcOut: { increment: tcOut },
        tcIn: { decrement: tcOut },
      },
    })

    return result
  })

import { z } from 'zod'
import { prisma } from 'lib/prisma'
import { authedProcedure } from 'server/trpc'

export const proPayment = authedProcedure
  .input(z.object({ character: z.string() }))
  .mutation(
    async ({
      ctx: {
        token: { id, proStatus },
      },
      input: { character },
    }) => {
      if (proStatus) return { paymentData: null }

      const data = {
        character,
        confirmed: false,
        lastUpdated: new Date().toISOString(),
      }

      const { paymentData } = await prisma.user.update({
        where: { id },
        data: {
          paymentData: {
            upsert: { create: data, update: data },
          },
        },
        include: { paymentData: true },
      })

      return { paymentData }
    },
  )

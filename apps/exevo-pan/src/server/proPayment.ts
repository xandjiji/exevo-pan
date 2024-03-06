import { z } from 'zod'
import { prisma } from 'lib/prisma'
import { authedProcedure } from 'server/trpc'
import { caller } from 'pages/api/trpc/[trpc]'

export const proPayment = authedProcedure
  .input(
    z.object({
      character: z.string().min(2).optional(),
    }),
  )
  .mutation(
    async ({
      ctx: {
        token: { id, proStatus },
      },
      input: { character },
    }) => {
      if (proStatus) return { paymentData: null }

      const data = {
        character: character ?? null,
        lastUpdated: new Date().toISOString(),
      }

      const user = await prisma.user.update({
        where: { id },
        data: {
          paymentData: {
            upsert: { create: { ...data, confirmed: false }, update: data },
          },
        },
        include: { paymentData: true },
      })

      const { email, paymentData } = user

      await caller.notifyAdmin({
        title: 'Exevo Pro order',
        body: character ?? email ?? user.id,
        url: 'https://www.exevopan.com/admin',
      })

      return { paymentData }
    },
  )

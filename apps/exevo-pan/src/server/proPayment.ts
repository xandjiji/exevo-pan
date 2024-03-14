import { z } from 'zod'
import { prisma } from 'lib/prisma'
import { authedProcedure } from 'server/trpc'
import { caller } from 'pages/api/trpc/[trpc]'

// @ ToDo: validate coupon (return perc discount)

export const proPayment = authedProcedure
  .input(
    z.object({
      character: z.string().min(2).optional(),
      coupon: z.string().optional(),
    }),
  )
  .mutation(
    async ({
      ctx: {
        token: { id, proStatus },
      },
      input: { character, coupon },
    }) => {
      if (proStatus) return { paymentData: null }

      const data = {
        character: character ?? null,
        lastUpdated: new Date().toISOString(),
      }

      let discountPercent = 0
      let referralUserId = ''
      if (coupon) {
        const referralTag = await prisma.referralTag.findUnique({
          where: { id: coupon },
        })

        if (referralTag) {
          discountPercent = referralTag.discountPercent
          referralUserId = referralTag.userId
        }
      }

      const user = await prisma.user.update({
        where: { id },
        data: {
          paymentData: {
            upsert: {
              create: {
                ...data,
                referralUserId,
                discountPercent,
                confirmed: false,
              },
              update: { ...data, referralUserId, discountPercent },
            },
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

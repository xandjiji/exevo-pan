import { z } from 'zod'
import { prisma } from 'lib/prisma'
import { authedProcedure } from 'server/trpc'
import { caller } from 'pages/api/trpc/[trpc]'

export const checkProCoupon = authedProcedure
  .input(z.string().min(3))
  .query(async ({ input }) => {
    const referralTag = await prisma.referralTag.findUnique({
      where: { coupon: input.toUpperCase() },
    })

    return referralTag ? referralTag.discountPercent : 0
  })

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
      input: { character, coupon: uncasedCoupon },
    }) => {
      if (proStatus) return { paymentData: null }

      const coupon = uncasedCoupon?.toUpperCase()

      const data = {
        character: character ?? null,
        lastUpdated: new Date().toISOString(),
      }

      let discountPercent = 0
      let referralUserId = ''
      if (coupon) {
        const referralTag = await prisma.referralTag.findUnique({
          where: { coupon },
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
                coupon,
              },
              update: { ...data, referralUserId, discountPercent, coupon },
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

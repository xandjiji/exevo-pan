import { z } from 'zod'
import { prisma } from 'lib/prisma'
import { authedProcedure } from 'server/trpc'

export const registerNotificationDevice = authedProcedure
  .input(
    z.object({
      endpoint: z.string(),
      p256dh: z.string().min(1),
      auth: z.string().min(1),
      metadata: z.string().optional(),
    }),
  )
  .mutation(
    async ({
      ctx: {
        token: { id },
      },
      input,
    }) => {
      const result = await prisma.notificationDevice.upsert({
        where: {
          auth: input.auth,
        },
        create: {
          ...input,
          user: { connect: { id } },
        },
        update: {
          ...input,
          user: { connect: { id } },
        },
      })

      return result
    },
  )

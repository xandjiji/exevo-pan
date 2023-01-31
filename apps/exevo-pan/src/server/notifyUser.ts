import webpush from 'web-push'
import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'

export const notifyUser = adminProcedure
  .input(
    z.object({
      userId: z.string(),
      title: z.string(),
      body: z.string(),
      url: z.string().optional(),
    }),
  )
  .mutation(async ({ input: { userId, ...data } }) => {
    const devices = await prisma.notificationDevice.findMany({
      where: { userId },
    })

    webpush.setVapidDetails(
      'https://www.exevopan.com/',
      process.env.NEXT_PUBLIC_VAPID_KEY as string,
      process.env.PRIVATE_VAPID_KEY as string,
    )

    const result = await Promise.all(
      devices.map(({ auth, endpoint, p256dh }) =>
        webpush
          .sendNotification(
            {
              endpoint,
              keys: { auth, p256dh },
            },
            JSON.stringify(data),
          )
          .catch((e) => {
            console.log(e)
          }),
      ),
    )

    return result
  })

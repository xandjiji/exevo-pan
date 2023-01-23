import webpush from 'web-push'
import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'

export const notifyAdmin = adminProcedure
  .input(z.object({ title: z.string(), body: z.string() }))
  .mutation(async ({ input }) => {
    const devices = await prisma.notificationDevice.findMany({
      where: { user: { role: 'ADMIN' } },
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
            JSON.stringify(input),
          )
          .catch(async (e) => {
            await prisma.notificationDevice.deleteMany({
              where: { user: { role: 'ADMIN' }, endpoint: e.endpoint },
            })
          }),
      ),
    )

    return result
  })

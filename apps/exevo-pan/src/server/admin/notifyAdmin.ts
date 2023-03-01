import type { WebPushError } from 'web-push'
import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { DeviceNotificationClient } from 'services/server'

export const notifyAdmin = adminProcedure
  .input(
    z.object({
      title: z.string(),
      body: z.string(),
      url: z.string().optional(),
    }),
  )
  .mutation(async ({ input: notification }) => {
    const devices = await prisma.notificationDevice.findMany({
      where: { user: { role: 'ADMIN' } },
    })

    const result = await Promise.all(
      devices.map((device) =>
        DeviceNotificationClient.notify({ device, notification }).catch(
          async (e: WebPushError) => {
            await prisma.notificationDevice.deleteMany({
              where: { user: { role: 'ADMIN' }, endpoint: e.endpoint },
            })
          },
        ),
      ),
    )

    return result
  })

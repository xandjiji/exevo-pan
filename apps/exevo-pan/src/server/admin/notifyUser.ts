import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { DeviceNotificationClient } from 'services/server'

export const notifyUser = adminProcedure
  .input(
    z.object({
      userId: z.string(),
      title: z.string(),
      body: z.string(),
      url: z.string().optional(),
    }),
  )
  .mutation(async ({ input: { userId, ...notification } }) => {
    const devices = await prisma.notificationDevice.findMany({
      where: { userId },
    })

    const result = await Promise.all(
      devices.map((device) =>
        DeviceNotificationClient.notify({ device, notification }),
      ),
    )

    return result
  })

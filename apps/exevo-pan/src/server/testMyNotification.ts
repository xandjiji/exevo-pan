import { z } from 'zod'
import { authedProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { DeviceNotificationClient } from 'services/server'

export const testMyNotification = authedProcedure
  .input(
    z.object({
      title: z.string(),
      text: z.string(),
    }),
  )
  .mutation(async ({ ctx: { token }, input: { title, text } }) => {
    const devices = await prisma.notificationDevice.findMany({
      where: { userId: token.id },
    })

    const result = await Promise.all(
      devices.map((device) =>
        DeviceNotificationClient.notify({
          device,
          notification: { title, body: text },
        }),
      ),
    )

    return result
  })

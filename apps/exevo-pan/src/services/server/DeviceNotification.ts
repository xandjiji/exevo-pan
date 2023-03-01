import webpush from 'web-push'
import type { NotificationDevice } from '@prisma/client'

type Notification = {
  title: string
  body: string
  url?: string
}

type NotifyDeviceArgs = {
  device: NotificationDevice
  notification: Notification
}

export default class DeviceNotificationClient {
  static async notify({
    device: { endpoint, auth, p256dh },
    notification,
  }: NotifyDeviceArgs) {
    webpush.setVapidDetails(
      'https://www.exevopan.com/',
      process.env.NEXT_PUBLIC_VAPID_KEY as string,
      process.env.PRIVATE_VAPID_KEY as string,
    )

    return webpush.sendNotification(
      {
        endpoint,
        keys: { auth, p256dh },
      },
      JSON.stringify(notification),
    )
  }
}

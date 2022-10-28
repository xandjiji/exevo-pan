import { endpoints } from 'Constants'

export default class NotifyAdminClient {
  static async notifyPurchase(): Promise<boolean> {
    try {
      const tokens = (process.env.TELTOKENS ?? '').split(',')
      await fetch(endpoints.FCM_SEND, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${process.env.NOTIFICATION_SERVER_KEY}`,
        },
        body: JSON.stringify({
          registration_ids: tokens,
          notification: {
            title: 'Exevo Pan',
            body: 'Opa!',
          },
        }),
      })

      return true
    } catch (error: unknown) {
      return false
    }
  }
}

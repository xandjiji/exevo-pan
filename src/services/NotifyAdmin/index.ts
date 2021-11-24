import { endpoints } from 'Constants'

export default class NotifyAdminClient {
  static fcmSendUrl = `${endpoints.FCM_SEND}`

  static async notifyPurchase(): Promise<boolean> {
    try {
      await fetch(this.fcmSendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${process.env.NOTIFICATION_SERVER_KEY}`,
        },
        body: JSON.stringify({
          registration_ids: [
            process.env.TELTOKEN_1,
            process.env.TELTOKEN_2,
            process.env.TELTOKEN_3,
          ],
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

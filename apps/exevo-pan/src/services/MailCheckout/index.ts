import { v4 as uuidv4 } from 'uuid'
import { endpoints } from 'Constants'

export default class MailCheckoutClient {
  static mailChekoutUrl = `${endpoints.MAIL_CHECKOUT}`

  static async postMail(purchase: AdvertisePurchase): Promise<string> {
    try {
      const response = await fetch(this.mailChekoutUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchase),
      })

      const { uuid } = await response.json()

      return uuid
    } catch (error: unknown) {
      return uuidv4()
    }
  }
}

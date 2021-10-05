import { v4 as uuidv4 } from 'uuid'
import { links, endpoints } from 'Constants'

export default class MailCheckoutClient {
  /* @ ToDo: local/prod env nas CONSTANTES */
  /* static mailChekoutUrl = `${links.CANONICAL}${endpoints.MAIL_CHECKOUT}` */
  static mailChekoutUrl = `http://localhost:3000${endpoints.MAIL_CHECKOUT}`

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

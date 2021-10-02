import { links, endpoints } from 'Constants'

export default class MailCheckoutClient {
  /* @ ToDo: local/prod env nas CONSTANTES */
  /* static mailChekoutUrl = `${links.CANONICAL}${endpoints.MAIL_CHECKOUT}` */
  static mailChekoutUrl = `http://localhost:3000${endpoints.MAIL_CHECKOUT}`

  static async postMail(purchase: AdvertisePurchase): Promise<200 | 400> {
    try {
      await fetch(this.mailChekoutUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchase),
      })

      return 200
    } catch (error: unknown) {
      return 400
    }
  }
}

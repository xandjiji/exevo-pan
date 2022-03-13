import { v4 as uuidv4 } from 'uuid'
import { mmddyyyy2ddmmyyy, sortStringDates } from 'utils'
import { endpoints } from 'Constants'

export default class MailCheckoutClient {
  static mailChekoutUrl = `${endpoints.MAIL_CHECKOUT}`

  static async postMail(purchase: AdvertisePurchase): Promise<string> {
    const withFormattedDates: AdvertisePurchase = {
      ...purchase,
      selectedDates: purchase.selectedDates
        .map(mmddyyyy2ddmmyyy)
        .sort(sortStringDates),
    }
    try {
      const response = await fetch(this.mailChekoutUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(withFormattedDates),
      })

      const { uuid } = await response.json()

      return uuid
    } catch (error: unknown) {
      return uuidv4()
    }
  }
}

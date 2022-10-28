import { endpoints } from 'Constants'

export default class NewsletterClient {
  static async registerEmail(email: string, locale: string): Promise<string> {
    try {
      const response = await fetch(endpoints.NEWSLETTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          locale,
        }),
      })

      const { message } = await response.json()

      return message
    } catch (error) {
      const { message } = await (error as any).response.json()
      return message
    }
  }
}

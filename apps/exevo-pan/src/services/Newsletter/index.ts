import { endpoints } from 'Constants'

export default class NewsletterClient {
  static async registerEmail(email: string): Promise<string> {
    try {
      const response = await fetch(endpoints.NEWSLETTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      const { message } = await response.json()

      return message
    } catch (error) {
      console.log(error)
      const { message } = await (error as any).response.json()
      return message
    }
  }
}

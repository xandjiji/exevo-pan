import { endpoints } from 'Constants'

export default class NotifyErrorClient {
  static async broadcast(message: any): Promise<void> {
    await fetch(endpoints.ERROR_REPORT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
  }
}

import { endpoints } from 'Constants'

export default class NotifyError {
  static async broadcast(message: string): Promise<void> {
    await fetch(endpoints.ERROR_REPORT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
  }
}

import { endpoints } from 'Constants'

const LOAD_MESSAGES_TIME = 1000

export default class NotifyErrorClient {
  private static errorQueue: any[] = []

  private static timeoutHandler: NodeJS.Timeout

  private static async broadcast(): Promise<void> {
    await fetch(endpoints.ERROR_REPORT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: this.errorQueue }),
    })

    this.errorQueue = []
  }

  static setMessage(message: any): void {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler)
    }

    this.errorQueue.push(message)
    this.timeoutHandler = setTimeout(() => this.broadcast(), LOAD_MESSAGES_TIME)
  }
}

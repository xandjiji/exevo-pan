import { Timestamp } from './Timestamp'

export class Timer {
  constructor() {
    this.startTimestamp = +new Date()
  }

  private startTimestamp = 0

  elapsedTime = (): string =>
    Timestamp.humanReadable(+new Date() - this.startTimestamp)
}

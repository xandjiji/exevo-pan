import { coloredText } from 'logging'

const timeColor = (ms: number) => {
  if (ms <= 2000) return 'success'
  if (ms <= 3500) return 'highlight'
  return 'fail'
}

export class Timer {
  constructor() {
    this.startTimestamp = +new Date()
  }

  private startTimestamp = 0

  elapsedTime = (): string => {
    const ms = +new Date() - this.startTimestamp
    return `${coloredText('[', 'control')}${coloredText(
      ms,
      timeColor(ms),
    )}ms${coloredText(']', 'control')}`
  }
}

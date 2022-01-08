import { broadcast, coloredText } from 'logging'

const DEFAULT_INTERVAL = 250

const formatMemory = (memory: number) =>
  Math.round((memory / 1024 / 1024) * 100) / 100

export default class MemoryWatcher {
  private memorySnapshots: number[] = []

  private intervalHandler: NodeJS.Timeout | null = null

  private addSnapshot() {
    const { rss } = process.memoryUsage()
    this.memorySnapshots.push(formatMemory(rss))
  }

  private getMemoryPeak() {
    const [peak] = this.memorySnapshots.sort((a, b) => b - a)
    return peak
  }

  public startWatching(): void {
    this.memorySnapshots = []
    const handler = setInterval(() => this.addSnapshot(), DEFAULT_INTERVAL)
    this.intervalHandler = handler
  }

  public stopWatching(): void {
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler)

      broadcast(
        `Peak memory usage during watch time: ${coloredText(
          `${this.getMemoryPeak()} MB`,
          'fail',
        )}`,
        'system',
      )
    }
  }
}

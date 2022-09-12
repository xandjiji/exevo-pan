/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'

const MILLISECONDS_IN_A_DAY = 86_400_000

const sanitizeTimestamp = (timestamp: number): number =>
  +new Date(new Date(timestamp).toDateString())

const dayDiffBetween = (
  currentTimestamp: number,
  nextTimestamp: number,
): number => {
  const millisecondsDiff =
    sanitizeTimestamp(nextTimestamp) - sanitizeTimestamp(currentTimestamp)

  return Math.floor(millisecondsDiff / MILLISECONDS_IN_A_DAY)
}

const getAppearencesIntervals = (appearences: number[]): number[] => {
  const intervals: number[] = []

  if (appearences.length < 2) return intervals

  appearences.forEach((currentTimestamp, currentIndex) => {
    const nextTimestamp = appearences[currentIndex + 1]

    if (!nextTimestamp) return

    intervals.push(dayDiffBetween(currentTimestamp, nextTimestamp))
  })

  return intervals
}

const calculateDistribution = (intervals: number[]): Distribution => {
  const min = Math.min(...intervals)
  const max = Math.max(...intervals)
  const dataSize = intervals.length

  const distribution: Distribution = {}
  for (
    let currentInterval = min;
    currentInterval <= max;
    currentInterval += 1
  ) {
    const occurrences = intervals.filter(
      (interval) => interval === currentInterval,
    ).length

    const frequency = occurrences / dataSize
    distribution[currentInterval] = +frequency.toFixed(4)
  }

  return distribution
}

export const generateBossDistributions = async (): Promise<
  Record<string, Distribution>
> => {
  const file = new BossStatistics()

  const serverList = await file.readAllServerNames()

  const taskSize = serverList.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText(
      'Generating distributions for each boss across all servers..',
      'highlight',
    ),
  )

  const bossIntervals: Record<string, number[]> = {}

  for (const server of serverList) {
    taskTracking.incTask()

    await file.load(server)

    const bossStatistics = file.getBossStatistics()

    Object.values(bossStatistics.bosses).forEach(({ name, appearences }) => {
      const intervals = getAppearencesIntervals(appearences)

      bossIntervals[name] = [...(bossIntervals[name] ?? []), ...intervals]
    })
  }

  taskTracking.finish()

  const bossDistributions: Record<string, Distribution> = {}

  Object.entries(bossIntervals).forEach(([bossName, intervals]) => {
    bossDistributions[bossName] = calculateDistribution(intervals)
  })

  return bossDistributions
}

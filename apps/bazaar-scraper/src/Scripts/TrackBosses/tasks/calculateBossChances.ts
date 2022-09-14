/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { dayDiffBetween, stripTimeFromTimestamp } from 'utils'

const MAX_APPEARENCES = 5

const normalizeDistribution = (distribution: Distribution): Distribution => {
  const normalizedDistribution: Distribution = {}

  const remainingProbabilityCeil = Object.values(distribution).reduce(
    (acc, probability) => acc + probability,
    0,
  )

  Object.keys(distribution).forEach((key) => {
    const interval = +key
    const probability = distribution[interval]
    const normalizedProbability = +(
      probability / remainingProbabilityCeil
    ).toFixed(4)

    normalizedDistribution[interval] = normalizedProbability
  })

  return normalizedDistribution
}

const calculateChance = (
  lastAppearence: number,
  distribution: Distribution,
): number => {
  const currentTimestamp = stripTimeFromTimestamp(+new Date())
  const daysSinceThen = dayDiffBetween(currentTimestamp, lastAppearence)

  const possibleDistribution: Distribution = {}
  Object.keys(distribution).forEach((key) => {
    const interval = +key
    if (daysSinceThen <= interval) {
      possibleDistribution[interval] = distribution[interval]
    }
  })

  const normalizedPossibleDistribution =
    normalizeDistribution(possibleDistribution)

  return normalizedPossibleDistribution[daysSinceThen]
}

export const calculateBossChances = async (
  serverList: string[],
  bossDistributions: Record<string, Distribution>,
): Promise<void> => {
  const taskSize = serverList.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText('Scraping kill statistics for each server', 'highlight'),
  )

  const lastUpdated = stripTimeFromTimestamp(+new Date())

  for (const server of serverList) {
    const file = new BossStatistics()

    await file.load(server)

    const { bosses } = file.getBossStatistics()

    const bossChances: BossChances = {
      server,
      lastUpdated,
      bosses: [],
    }

    for (const { name, appearences } of Object.values(bosses)) {
      const lastAppearences = appearences.slice(-MAX_APPEARENCES)
      const [lastAppearence] = appearences.slice(-1)

      bossChances.bosses.push({
        name,
        currentChance: lastAppearence
          ? calculateChance(lastAppearence, bossDistributions[name])
          : undefined,
        lastAppearences,
      })
    }

    await file.saveBossChance(bossChances)
    taskTracking.incTask()
  }

  taskTracking.finish()
}

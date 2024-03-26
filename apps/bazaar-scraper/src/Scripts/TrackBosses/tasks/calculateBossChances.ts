/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BossStatistics } from 'Data'
import { broadcast, coloredText, TrackETA } from 'logging'
import { dayDiffBetween } from 'utils'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { bossStatistics } from 'data-dictionary/dist/dictionaries/bossStatistics'
import { getDateRelativeToSS } from 'shared-utils/dist/time'
import {
  dilluteDistribution,
  normalizeDistributionRange,
  offsetDistribution,
} from './utils'

type CalculateChanceArgs = {
  appearences: number[]
  distribution: Distribution
  bossSchema?: BossSchema
  isTomorrow?: boolean
}

const calculateStats = ({
  appearences,
  distribution,
  bossSchema,
  isTomorrow = true,
}: CalculateChanceArgs): Pick<
  BossStats,
  'currentChance' | 'expectedIn' | 'daysLeftForPossibleSpawns'
> => {
  if (!bossSchema) return {}

  const tomorrow = getDateRelativeToSS()
  if (isTomorrow) {
    tomorrow.setDate(tomorrow.getDate() + 1)
  }
  const tomorrowTimestamp = +tomorrow

  const [lastAppearence] = appearences.slice(-1)
  const daysSinceThen = Math.round(
    dayDiffBetween(lastAppearence, tomorrowTimestamp),
  )

  const { fixedDaysFrequency, spawnCount } = bossSchema

  /* different stats for bosses with multiple spawns */
  if (spawnCount) {
    return {
      daysLeftForPossibleSpawns: appearences
        .slice(-spawnCount)
        .map(
          (appearence) =>
            fixedDaysFrequency.min -
            Math.round(dayDiffBetween(appearence, tomorrowTimestamp, false)),
        ),
    }
  }

  /* before range */
  if (daysSinceThen < fixedDaysFrequency.min) {
    return {
      currentChance: 0,
      expectedIn: Math.abs(fixedDaysFrequency.min - daysSinceThen),
    }
  }

  /* in range */
  if (daysSinceThen <= fixedDaysFrequency.max) {
    const endOfDistribution = Math.max(...distribution.keys())
    const normalizedDistribution = normalizeDistributionRange(distribution, {
      min: daysSinceThen,
      max: endOfDistribution,
    })

    const currentChance = normalizedDistribution.get(daysSinceThen)
    if (currentChance) {
      return {
        currentChance: normalizedDistribution.get(daysSinceThen),
      }
    }

    return {
      currentChance: 0,
      expectedIn: 1,
    }
  }

  /* out of range */
  const nextPossibleRange = {
    min: 2 * fixedDaysFrequency.min,
    max: 2 * fixedDaysFrequency.max,
  }

  /* before next range */
  if (daysSinceThen < nextPossibleRange.min) {
    return {
      currentChance: 0,
      expectedIn: Math.abs(nextPossibleRange.min - daysSinceThen),
    }
  }

  /* in next range */
  if (daysSinceThen <= nextPossibleRange.max) {
    const rangeDistance = nextPossibleRange.min - fixedDaysFrequency.min
    const estimatedNextDistribution = offsetDistribution(
      rangeDistance,
      dilluteDistribution(
        normalizeDistributionRange(distribution, fixedDaysFrequency),
      ),
    )

    return {
      currentChance: estimatedNextDistribution.get(daysSinceThen),
    }
  }

  return {}
}

type CalculateBossChancesArgs = {
  activeServers: ServerObject[]
  bossDistributions: Record<string, Distribution>
  wasUpdated: boolean
  isTomorrow?: boolean
}

export const calculateBossChances = async ({
  activeServers,
  bossDistributions,
  wasUpdated,
  isTomorrow = true,
}: CalculateBossChancesArgs): Promise<void> => {
  const taskSize = activeServers.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText('Scraping kill statistics for each server', 'highlight'),
  )

  broadcast('Calculating fresh boss chances...', 'neutral')

  const lastUpdated = +new Date()

  for (const { serverName } of activeServers) {
    const file = new BossStatistics()

    await file.load(serverName)

    const { bosses, latest } = file.getBossStatistics()

    const bossChances: BossChances = {
      server: serverName,
      lastUpdated: wasUpdated ? lastUpdated : latest.timestamp,
      bosses: [],
    }

    for (const { name, appearences } of Object.values(bosses)) {
      const [lastAppearence] = appearences.slice(-1)

      bossChances.bosses.push({
        name,
        lastAppearence,
        ...calculateStats({
          appearences,
          distribution: bossDistributions[name],
          bossSchema: bossStatistics.get(name as TrackedBossName),
          isTomorrow,
        }),
      })
    }

    await file.saveBossChance(bossChances)
    taskTracking.incTask()
  }

  taskTracking.finish()
}

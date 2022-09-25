/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { dayDiffBetween } from 'utils'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import {
  dilluteDistribution,
  normalizeDistributionRange,
  offsetDistribution,
} from './utils'
import { schema } from '../schema'

type CalculateChanceArgs = {
  appearences: number[]
  distribution: Distribution
  bossSchema?: BossSchema
}

const calculateStats = ({
  appearences,
  distribution,
  bossSchema,
}: CalculateChanceArgs): Pick<
  BossStats,
  'currentChance' | 'expectedIn' | 'daysLeftForPossibleSpawns'
> => {
  if (!bossSchema) return {}

  const currentTimestamp = +new Date()
  const [lastAppearence] = appearences.slice(-1)
  const daysSinceThen = Math.round(
    dayDiffBetween(lastAppearence, currentTimestamp),
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
            Math.round(dayDiffBetween(appearence, currentTimestamp, false)),
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

export const calculateBossChances = async (
  serverList: string[],
  bossDistributions: Record<string, Distribution>,
): Promise<void> => {
  const taskSize = serverList.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText('Scraping kill statistics for each server', 'highlight'),
  )

  const lastUpdated = +new Date()

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
      const [lastAppearence] = appearences.slice(-1)

      bossChances.bosses.push({
        name,
        lastAppearence,
        ...calculateStats({
          appearences,
          distribution: bossDistributions[name],
          bossSchema: schema.get(name as TrackedBossName),
        }),
      })
    }

    await file.saveBossChance(bossChances)
    taskTracking.incTask()
  }

  taskTracking.finish()
}

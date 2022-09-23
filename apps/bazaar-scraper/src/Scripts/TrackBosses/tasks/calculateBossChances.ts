/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { dayDiffBetween, makeRangeArray } from 'utils'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { schema } from '../schema'

const offsetDistribution = (offsetBy: number, distribution: Distribution) => {
  const newDistribution: Distribution = new Map()
  for (const [interval, chance] of distribution) {
    newDistribution.set(interval + offsetBy, chance)
  }

  return newDistribution
}

const normalizeDistributionRange = (
  distribution: Distribution,
  { min, max }: DaysRange,
): Distribution => {
  const newDistribution: Distribution = new Map()

  const intervalsWithinRange = new Set(makeRangeArray(min, max))

  let remainingProbabilityCeil = 0
  distribution.forEach((chance, interval) => {
    if (intervalsWithinRange.has(interval)) {
      remainingProbabilityCeil += chance
    }
  })

  distribution.forEach((chance, interval) => {
    if (intervalsWithinRange.has(interval)) {
      newDistribution.set(
        interval,
        +(chance / remainingProbabilityCeil).toFixed(4),
      )
    }
  })

  return newDistribution
}

const dilluteDistribution = (distribution: Distribution): Distribution => {
  const intervals = [...distribution.keys()]
  const distributionLength = intervals.length

  const min = Math.min(...intervals)

  const newDistribution: Distribution = new Map()

  const applyValuesStartingAt = (startingOffset: number) => {
    let offsetInc = 0
    for (const chance of distribution.values()) {
      const offset = startingOffset + offsetInc
      newDistribution.set(offset, (newDistribution.get(offset) ?? 0) + chance)

      offsetInc += 1
    }
  }

  for (let offsetInc = 0; offsetInc < distributionLength; offsetInc += 1) {
    const offset = min + offsetInc

    applyValuesStartingAt(offset)
  }

  return normalizeDistributionRange(newDistribution, {
    min: Math.min(...newDistribution.keys()),
    max: Math.max(...newDistribution.keys()),
  })
}

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
    const normalizedDistribution = normalizeDistributionRange(
      distribution,
      fixedDaysFrequency,
    )

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

/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { dayDiffBetween, makeRangeArray } from 'utils'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { schema } from '../schema'

const MAX_APPEARENCES = 5

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

type CalculateChanceArgs = {
  lastAppearence: number
  distribution: Distribution
  bossSchema?: BossSchema
}

const calculateStats = ({
  lastAppearence,
  distribution,
  bossSchema,
}: CalculateChanceArgs): Pick<BossStats, 'currentChance' | 'expectedIn'> => {
  if (!bossSchema) return {}

  const currentTimestamp = +new Date()
  const daysSinceThen = Math.round(
    dayDiffBetween(currentTimestamp, lastAppearence),
  )

  const { fixedDaysFrequency } = bossSchema

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
    return {
      currentChance: normalizedDistribution.get(daysSinceThen),
    }
    /* @ ToDo: return current chance */
  }

  /* out of range */
  /* @ ToDo: obtain new possible range multiplying min/max */
  /* @ ToDo: normalize distribution inside new range */
  /* @ ToDo: return current chance */

  return distribution.get(daysSinceThen)
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
      const lastAppearences = appearences.slice(-MAX_APPEARENCES)
      const [lastAppearence] = appearences.slice(-1)

      bossChances.bosses.push({
        name,
        lastAppearences,
        ...calculateStats({
          lastAppearence,
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

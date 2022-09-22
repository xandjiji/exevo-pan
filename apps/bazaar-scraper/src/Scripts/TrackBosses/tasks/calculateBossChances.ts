/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { dayDiffBetween } from 'utils'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { schema } from '../schema'

const MAX_APPEARENCES = 5

type CalculateChanceArgs = {
  lastAppearence: number
  distribution: Distribution
  bossSchema?: BossSchema
}

const calculateChance = ({
  lastAppearence,
  distribution,
  bossSchema,
}: CalculateChanceArgs): number | undefined => {
  if (!bossSchema) return undefined

  const currentTimestamp = +new Date()
  const daysSinceThen = Math.round(
    dayDiffBetween(currentTimestamp, lastAppearence),
  )

  const { fixedDaysFrequency } = bossSchema

  /* before range */
  if (daysSinceThen < fixedDaysFrequency.min) {
    /* @ ToDo: expectedIn = diff between daysSinceThen and min */
    /* @ ToDo: return 0% chance */
  }

  /* in range */
  if (daysSinceThen <= fixedDaysFrequency.max) {
    /* @ ToDo: normalize distribution inside range */
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
        currentChance: calculateChance({
          lastAppearence,
          distribution: bossDistributions[name],
          bossSchema: schema.get(name as TrackedBossName),
        }),
        lastAppearences,
      })
    }

    await file.saveBossChance(bossChances)
    taskTracking.incTask()
  }

  taskTracking.finish()
}

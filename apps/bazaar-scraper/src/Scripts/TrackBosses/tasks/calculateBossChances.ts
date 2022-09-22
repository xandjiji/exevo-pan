/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { dayDiffBetween } from 'utils'
import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'
import { schema } from '../schema'

const MAX_APPEARENCES = 5

const calculateChance = (
  lastAppearence: number,
  distribution: Distribution,
): number | undefined => {
  const currentTimestamp = +new Date()
  const daysSinceThen = Math.round(
    dayDiffBetween(currentTimestamp, lastAppearence),
  )

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

      const bossSchema = schema.get(name as TrackedBossName)

      if (!bossSchema) {
        bossChances.bosses.push({ name, lastAppearences })
      } else {
        bossChances.bosses.push({
          name,
          currentChance: calculateChance(
            lastAppearence,
            bossDistributions[name],
          ),
          lastAppearences,
        })
      }
    }

    await file.saveBossChance(bossChances)
    taskTracking.incTask()
  }

  taskTracking.finish()
}

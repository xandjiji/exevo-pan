/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { dayDiffBetween } from 'utils'

const MAX_APPEARENCES = 5

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
        currentChance: lastAppearence
          ? bossDistributions[name][dayDiffBetween(+new Date(), lastAppearence)]
          : undefined,
        lastAppearences,
      })
    }

    file.saveBossChance(bossChances)
    taskTracking.incTask()
  }

  taskTracking.finish()
}

import { broadcast } from 'logging'
import { KillStatistics } from 'Helpers'
import { BossStatistics } from 'Data'

import { singleSampleFrom } from 'mock-maker/src/utils'
import { fetch } from '../utils'

export const checkForPageUpdates = async (
  serverList: string[],
): Promise<boolean> => {
  broadcast('Checking for kill statistics page update...', 'neutral')
  const randomServer = singleSampleFrom(serverList)

  const helper = new KillStatistics()
  const data = new BossStatistics()
  data.load(randomServer)

  const bossKillsData = helper.lastDayBossKills(
    await fetch.killStatisticsPage(randomServer),
  )

  return data.isDataFresh(bossKillsData)
}

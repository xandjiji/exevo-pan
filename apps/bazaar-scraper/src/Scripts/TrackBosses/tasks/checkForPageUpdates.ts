import { KillStatistics } from 'Helpers'
import { BossStatistics } from 'Data'

import { singleSampleFrom } from 'mock-maker/src/utils'
import { fetch } from '../utils'

export const checkForPageUpdates = async (
  activeServers: ServerObject[],
): Promise<boolean> => {
  const randomServer = singleSampleFrom(activeServers)

  const helper = new KillStatistics()
  const data = new BossStatistics()
  data.load(randomServer.serverName)

  const bossKillsData = helper.lastDayBossKills(
    await fetch.killStatisticsPage(randomServer.serverName),
  )

  return data.isDataFresh(bossKillsData)
}

import { KillStatistics } from 'Helpers'
import { broadcast } from 'logging'
import { db, fetch, generateHash } from '../utils'

export const checkForPageUpdates = async (): Promise<boolean> => {
  broadcast('Checking for kill statistics page update...', 'neutral')

  const helper = new KillStatistics()
  const randomServer = await db.getRandomServerHash()

  const currentBossKillsData = helper.lastDayBossKills(
    await fetch.killStatisticsPage(randomServer.server),
  )

  const currentHash = generateHash(currentBossKillsData)

  return currentHash !== randomServer.hash
}

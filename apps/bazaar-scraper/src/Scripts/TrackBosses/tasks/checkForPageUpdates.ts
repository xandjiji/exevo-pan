import { prisma } from 'services'
import { KillStatistics } from 'Helpers'
import { broadcast } from 'logging'
import { retryWrapper } from 'utils'
import { fetch, generateHash } from '../utils'

const DEFAULT_SERVER = 'Antica'

const db = {
  getLatestServerHash: retryWrapper(async (server: string) => {
    const serverHash = await prisma.killStatisticsHash.findFirst({
      where: { server },
    })

    return serverHash ? serverHash.hash : ''
  }),
}

export const checkForPageUpdates = async (): Promise<boolean> => {
  broadcast('Checking for kill statistics page update...', 'neutral')

  const helper = new KillStatistics()
  const currentBossKillsData = helper.lastDayBossKills(
    await fetch.killStatisticsPage(DEFAULT_SERVER),
  )

  const currentHash = generateHash(currentBossKillsData)
  const latestHash = await db.getLatestServerHash(DEFAULT_SERVER)

  return currentHash !== latestHash
}

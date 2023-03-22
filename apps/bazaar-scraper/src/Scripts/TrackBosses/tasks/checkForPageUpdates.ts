import { KillStatistics } from 'Helpers'
import { BossStatistics } from 'Data'
import { fetch } from '../utils'

const getMostStaleServer = async (activeServers: ServerObject[]) => {
  const [mostStaleServer] = await Promise.all(
    activeServers.map(({ serverName }) => {
      const data = new BossStatistics()
      return data.load(serverName).then(() => ({
        serverName,
        updatedAt: data.bossStatistics.latest.timestamp,
      }))
    }),
  ).then((array) => array.sort((a, b) => a.updatedAt - b.updatedAt))

  return mostStaleServer.serverName
}

export const checkForPageUpdates = async (
  activeServers: ServerObject[],
): Promise<boolean> => {
  const helper = new KillStatistics()
  const data = new BossStatistics()
  const mostStaleServer = await getMostStaleServer(activeServers)
  await data.load(mostStaleServer)

  const bossKillsData = helper.lastDayBossKills(
    await fetch.killStatisticsPage(mostStaleServer),
  )

  return data.isDataFresh(bossKillsData)
}

import { HttpClient, prisma } from 'services'
import { KillStatistics } from 'Helpers'
import { retryWrapper, sha256 } from 'utils'

export const KILL_STATISTICS_BASE_URL =
  'https://www.tibia.com/community/?subtopic=killstatistics'

export const fetch = {
  serverNames: retryWrapper(async () => {
    const helper = new KillStatistics()
    return helper.servers(await HttpClient.getHtml(KILL_STATISTICS_BASE_URL))
  }),
  killStatisticsPage: retryWrapper((serverName: string) =>
    HttpClient.getHtml(`${KILL_STATISTICS_BASE_URL}&world=${serverName}`),
  ),
}

export const db = {
  getLatestServerHash: retryWrapper(async (server: string) => {
    const serverHash = await prisma.killStatisticsHash.findFirst({
      where: { server },
    })

    return serverHash ? serverHash.hash : ''
  }),
}

export const generateHash = (
  bossKillsData: Record<string, BossKills>,
): string => sha256(JSON.stringify(bossKillsData))

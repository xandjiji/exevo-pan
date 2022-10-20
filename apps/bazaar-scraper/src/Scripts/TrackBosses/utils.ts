import { HttpClient, prisma } from 'services'
import { KillStatistics } from 'Helpers'
import { retryWrapper, sha256 } from 'utils'
import { singleSampleFrom } from 'mock-maker/src/utils'

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
  getRandomServerHash: retryWrapper(async () => {
    const randomServer = singleSampleFrom(
      await prisma.server.findMany({ where: { active: true } }),
    )

    const serverHash = await prisma.killStatisticsHash.findFirst({
      where: { server: randomServer.serverName },
    })

    return {
      server: randomServer.serverName,
      hash: serverHash ? serverHash.hash : '',
    }
  }),
  getServerKillStatistics: retryWrapper(() =>
    prisma.killStatisticsHash.findMany(),
  ),
  getBossApparitions: retryWrapper((boss: string) =>
    prisma.bossApparition.findMany({
      where: { name: boss },
      select: { server: true, timestamp: true },
    }),
  ),
}

export const generateHash = (
  bossKillsData: Record<string, BossKills>,
): string => sha256(JSON.stringify(bossKillsData))

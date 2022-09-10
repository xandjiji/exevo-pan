import { HttpClient } from 'services'
import { KillStatistics } from 'Helpers'
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { retryWrapper, batchPromises } from 'utils'
import { KILL_STATISTICS_BASE_URL } from '../utils'

const fetchKillStatisticsPage = retryWrapper((serverName: string) =>
  HttpClient.getHtml(`${KILL_STATISTICS_BASE_URL}&world=${serverName}`),
)

export const scrapEachServerKillStatistics = async (
  serverList: string[],
): Promise<void> => {
  const batchSize = serverList.length
  const taskTracking = new TrackETA(
    batchSize,
    coloredText('Scraping kill statistics for each server', 'highlight'),
  )

  const tasks = serverList.map((serverName) => async () => {
    const helper = new KillStatistics()
    const file = new BossStatistics()
    taskTracking.incTask()

    await file.load(serverName)

    file.feedData(
      helper.lastDayBossKills(await fetchKillStatisticsPage(serverName)),
    )
  })

  await batchPromises(tasks)

  taskTracking.finish()
}

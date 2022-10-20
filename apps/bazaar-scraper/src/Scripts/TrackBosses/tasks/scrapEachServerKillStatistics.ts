/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { HttpClient } from 'services'
import { KillStatistics } from 'Helpers'
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { retryWrapper, sleep } from 'utils'
import { requests } from 'Constants'
import { KILL_STATISTICS_BASE_URL } from '../utils'

const { DELAY } = requests

const fetchKillStatisticsPage = retryWrapper((serverName: string) =>
  HttpClient.getHtml(`${KILL_STATISTICS_BASE_URL}&world=${serverName}`),
)

export const scrapEachServerKillStatistics = async (
  serverList: string[],
): Promise<void> => {
  const taskSize = serverList.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText('Scraping kill statistics for each server', 'highlight'),
  )

  for (const server of serverList) {
    const helper = new KillStatistics()
    const file = new BossStatistics()

    await file.load(server)

    await file.feedData(
      helper.lastDayBossKills(await fetchKillStatisticsPage(server)),
    )

    await sleep(DELAY)
    taskTracking.incTask()
  }

  taskTracking.finish()
}

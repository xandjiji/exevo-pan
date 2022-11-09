/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { HttpClient } from 'services'
import { KillStatistics } from 'Helpers'
import { BossStatistics } from 'Data'
import { tabBroadcast, coloredText, TrackETA } from 'logging'
import { retryWrapper, sleep } from 'utils'
import { KILL_STATISTICS_BASE_URL } from '../utils'

const DELAY = 5000

const fetchKillStatisticsPage = retryWrapper((serverName: string) =>
  HttpClient.getHtml(`${KILL_STATISTICS_BASE_URL}&world=${serverName}`),
)

export const scrapEachServerKillStatistics = async (
  serverList: string[],
): Promise<boolean> => {
  const taskSize = serverList.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText('Scraping kill statistics for each server', 'highlight'),
  )

  let wasUpdated = false
  for (const server of serverList) {
    tabBroadcast(server, 'control')
    const helper = new KillStatistics()
    const file = new BossStatistics()

    await file.load(server)

    const newData = await file.feedData(
      helper.lastDayBossKills(await fetchKillStatisticsPage(server)),
    )

    if (newData) wasUpdated = newData

    await sleep(DELAY)
    taskTracking.incTask()
  }

  taskTracking.finish()

  return wasUpdated
}

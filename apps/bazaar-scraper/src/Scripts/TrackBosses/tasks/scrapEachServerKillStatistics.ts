/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { KillStatistics } from 'Helpers'
import { BossStatistics } from 'Data'
import { coloredText, TrackETA } from 'logging'
import { sleep } from 'utils'
import { fetch } from '../utils'

const DELAY = 1000

export const scrapEachServerKillStatistics = async (
  serverList: ServerObject[],
): Promise<void> => {
  const taskSize = serverList.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText('Scraping kill statistics for each server', 'highlight'),
  )

  for (const { serverName } of serverList) {
    const helper = new KillStatistics()
    const file = new BossStatistics()

    await file.load(serverName)

    await file.feedData(
      helper.lastDayBossKills(await fetch.killStatisticsPage(serverName)),
    )

    await sleep(DELAY)
    taskTracking.incTask()
  }

  taskTracking.finish()
}

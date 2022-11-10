/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { KillStatistics } from 'Helpers'
import { BossStatistics } from 'Data'
import { tabBroadcast, coloredText, TrackETA } from 'logging'
import { sleep } from 'utils'
import { fetch } from '../utils'

const DELAY = 5000

export const scrapEachServerKillStatistics = async (
  serverList: ServerObject[],
): Promise<boolean> => {
  const taskSize = serverList.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText('Scraping kill statistics for each server', 'highlight'),
  )

  let wasUpdated = false
  for (const { serverName } of serverList) {
    tabBroadcast(serverName, 'control')
    const helper = new KillStatistics()
    const file = new BossStatistics()

    await file.load(serverName)

    const newData = await file.feedData(
      helper.lastDayBossKills(await fetch.killStatisticsPage(serverName)),
    )

    if (newData) wasUpdated = newData

    await sleep(DELAY)
    taskTracking.incTask()
  }

  taskTracking.finish()

  return wasUpdated
}

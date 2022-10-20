/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { constTokens as bossDictionary } from 'data-dictionary/dist/dictionaries/bosses'
import { KillStatistics } from 'Helpers'
import { tabBroadcast, coloredText, TrackETA } from 'logging'
import { MILLISECONDS_IN_A_DAY, sleep } from 'utils'
import { requests } from 'Constants'
import { fetch, generateHash } from '../utils'

const { DELAY } = requests

const DEFAULT_BOSS_KILLS: BossKills = { playersKilled: 0, killedByPlayers: 0 }

export const scrapFreshBossApparitions = async (): Promise<
  FreshKillStatisticsData[]
> => {
  const serverList = await fetch.serverNames()

  const taskSize = serverList.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText('Scraping new kill statistics for each server', 'highlight'),
  )

  const freshKillStatisticsData: FreshKillStatisticsData[] = []

  for (const server of serverList) {
    tabBroadcast(`Fetching recent kill statistics for ${server}...`, 'neutral')
    const helper = new KillStatistics()

    const bossKillsData = helper.lastDayBossKills(
      await fetch.killStatisticsPage(server),
    )

    const currentHash = generateHash(bossKillsData)

    const currentTimestamp = +new Date()
    const offsettedTimestamp = currentTimestamp - MILLISECONDS_IN_A_DAY / 2

    const bossApparitions: BossApparition[] = Object.entries(bossDictionary)
      .map(([bossToken, bossName]) => ({
        ...(bossKillsData[bossToken] ?? DEFAULT_BOSS_KILLS),
        name: bossName,
      }))
      .filter(
        ({ playersKilled, killedByPlayers }) =>
          playersKilled + killedByPlayers > 0,
      )
      .map(({ name }) => ({
        server,
        name,
        timestamp: offsettedTimestamp,
      }))

    freshKillStatisticsData.push({ server, hash: currentHash, bossApparitions })

    await sleep(DELAY)
    taskTracking.incTask()
  }

  taskTracking.finish()

  return freshKillStatisticsData
}

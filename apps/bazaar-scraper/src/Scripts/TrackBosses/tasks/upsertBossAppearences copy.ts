/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { constTokens as bossDictionary } from 'data-dictionary/dist/dictionaries/bosses'
import { prisma } from 'services'
import { KillStatistics } from 'Helpers'
import { tabBroadcast, coloredText, TrackETA } from 'logging'
import { MILLISECONDS_IN_A_DAY, retryWrapper, sleep } from 'utils'
import { requests } from 'Constants'
import { fetch, db, generateHash } from '../utils'

const { DELAY } = requests

const DEFAULT_BOSS_KILLS: BossKills = { playersKilled: 0, killedByPlayers: 0 }

export const get = async (): Promise<void> => {
  const serverList = await fetch.serverNames()

  const taskSize = serverList.length
  const taskTracking = new TrackETA(
    taskSize,
    coloredText('Scraping new kill statistics for each server', 'highlight'),
  )

  for (const server of serverList) {
    tabBroadcast(`Fetching recent kill statistics for ${server}...`, 'neutral')
    const helper = new KillStatistics()

    const bossKillsData = helper.lastDayBossKills(
      await fetch.killStatisticsPage(server),
    )

    const currentHash = generateHash(bossKillsData)

    const currentTimestamp = +new Date()
    const offsettedTimestamp = currentTimestamp - MILLISECONDS_IN_A_DAY / 2

    tabBroadcast(`Inserting new boss appearences for ${server}...`, 'neutral')

    const updateBossAppearences = retryWrapper(() =>
      prisma.$transaction([
        prisma.bossAppearence.createMany({
          data: Object.entries(bossDictionary)
            .map(([bossToken, bossName]) => ({
              ...(bossKillsData[bossToken] ?? DEFAULT_BOSS_KILLS),
              name: bossName,
            }))
            .filter(
              ({ playersKilled, killedByPlayers }) =>
                playersKilled + killedByPlayers > 0,
            )
            .map(({ name }) => ({
              name,
              server,
              timestamp: offsettedTimestamp,
            })),
        }),
        prisma.killStatisticsHash.upsert({
          where: { server },
          create: { server, hash: currentHash, timestamp: currentTimestamp },
          update: { hash: currentHash, timestamp: currentTimestamp },
        }),
      ]),
    )

    await updateBossAppearences()

    await sleep(DELAY)
    taskTracking.incTask()
  }

  taskTracking.finish()
}

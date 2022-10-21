import fs from 'fs/promises'
import { constTokens as bossDictionary } from 'data-dictionary/dist/dictionaries/bosses'
import { broadcast, tabBroadcast, coloredText } from 'logging'
import { file } from 'Constants'
import { sha256, MILLISECONDS_IN_A_DAY, retryWrapper } from 'utils'
import { prisma } from 'services'

const db = {
  upsertBossChances: retryWrapper(
    ({ server, jsonData }: { server: string; jsonData: string }) =>
      prisma.bossChance.upsert({
        where: { server },
        create: { server, jsonData },
        update: { jsonData },
      }),
  ),
}

const { serverResolver, path } = file.BOSS_STATISTICS

const trackedBossTokens = Object.keys(bossDictionary) as Array<
  keyof typeof bossDictionary
>

export default class BossStatisticsData {
  private bossStatistics: BossStatistics = {
    server: '',
    latest: {
      hash: '',
      timestamp: 0,
    },
    bosses: {},
  }

  private coloredFileName = (name: string) =>
    coloredText(`${name}.json`, 'highlight')

  private normalizeCurrentBossStatistics() {
    /* adding new bosses */
    trackedBossTokens.forEach((bossToken) => {
      if (!this.bossStatistics.bosses[bossToken]) {
        this.bossStatistics.bosses[bossToken] = {
          name: bossDictionary[bossToken],
          appearences: [],
        }
      }
    })

    /* removing deprecated bosses */
    const trackedBossSet: Set<string> = new Set(trackedBossTokens)
    Object.keys(this.bossStatistics.bosses).forEach((bossToken) => {
      if (!trackedBossSet.has(bossToken)) {
        delete this.bossStatistics.bosses[bossToken]
      }
    })
  }

  async load(serverName: string): Promise<void> {
    const serverFile = this.coloredFileName(serverName)

    try {
      this.bossStatistics = JSON.parse(
        await fs.readFile(serverResolver(serverName), 'utf-8'),
      )
    } catch {
      broadcast(
        `Failed to load ${serverFile}, initializing a new one...`,
        'fail',
      )

      this.bossStatistics = { ...this.bossStatistics, server: serverName }
    } finally {
      this.normalizeCurrentBossStatistics()
    }
  }

  async readAllServerNames(): Promise<string[]> {
    try {
      return (await fs.readdir(path, 'utf-8'))
        .map((fileName) => {
          const [serverName] = fileName.split('.')
          return serverName
        })
        .filter(Boolean)
    } catch {
      broadcast(
        `Could not find kill statistics for any server on ${path}`,
        'fail',
      )

      return []
    }
  }

  private async save(): Promise<void> {
    const serverName = this.bossStatistics.server

    await fs.writeFile(
      serverResolver(serverName),
      JSON.stringify(this.bossStatistics),
    )
    tabBroadcast(
      `Updated boss statistics and saved to ${this.coloredFileName(
        serverName,
      )}`,
      'success',
    )
  }

  public async saveBossChance(bossChances: BossChances): Promise<void> {
    const { server } = bossChances
    const jsonData = JSON.stringify(bossChances)
    await Promise.all([
      fs.writeFile(file.BOSS_CHANCES.serverResolver(server), jsonData),
      db.upsertBossChances({ server, jsonData }),
    ])

    tabBroadcast(
      `Current boss chances were saved to ${this.coloredFileName(
        server,
      )} and to the database`,
      'success',
    )
  }

  private generateHash(bossKillsData: Record<string, BossKills>): string {
    return sha256(JSON.stringify(bossKillsData))
  }

  private normalizeBossKills(
    bossKillsData: Record<string, BossKills>,
  ): Record<string, BossKills> {
    const trackedBosses: typeof bossKillsData = {}
    trackedBossTokens.forEach((bossName) => {
      trackedBosses[bossName] = bossKillsData[bossName] ?? {
        playersKilled: 0,
        killedByPlayers: 0,
      }
    })

    return trackedBosses
  }

  public isDataFresh(bossKillsData: Record<string, BossKills>): boolean {
    const newestHash = this.generateHash(bossKillsData)
    return this.bossStatistics.latest.hash !== newestHash
  }

  public async feedData(
    bossKillsData: Record<string, BossKills>,
  ): Promise<void> {
    const serverName = this.bossStatistics.server

    if (!this.isDataFresh(bossKillsData)) {
      tabBroadcast(`Data for ${serverName} still not updated`, 'control')
    }

    const newestHash = this.generateHash(bossKillsData)
    const currentTimestamp = +new Date()
    const offsettedTimestamp = +new Date() - MILLISECONDS_IN_A_DAY / 2

    const trackedBossKills = this.normalizeBossKills(bossKillsData)

    Object.entries(trackedBossKills).forEach(
      ([bossName, { playersKilled, killedByPlayers }]) => {
        const appeared = playersKilled + killedByPlayers > 0

        if (appeared) {
          this.bossStatistics.bosses[bossName].appearences.push(
            offsettedTimestamp,
          )
        }
      },
    )

    this.bossStatistics.latest.hash = newestHash
    this.bossStatistics.latest.timestamp = currentTimestamp

    await this.save()
  }

  getBossStatistics(): BossStatistics {
    if (this.bossStatistics.latest.timestamp === 0) {
      throw Error('Trying to read boss statistics before loading them')
    }

    return this.bossStatistics
  }
}

import fs from 'fs/promises'
import {
  BossToken,
  constTokens as bossDictionary,
} from 'data-dictionary/dist/dictionaries/bosses'
import { bossStatistics } from 'data-dictionary/dist/dictionaries/bossStatistics'
import { getDateRelativeToSS } from 'shared-utils/dist/time'
import { broadcast, coloredText, tabBroadcast } from 'logging'
import { file } from 'Constants'
import { doTimes, sha256 } from 'utils'

const { serverResolver, path } = file.BOSS_STATISTICS

const trackedBossTokens = Object.keys(bossDictionary) as Array<
  keyof typeof bossDictionary
>

const multinameBosses = new Map<BossToken, string[]>()
multinameBosses.set('Rotrender', [
  'Rotrender',
  'Rotrender Hexed Scourge',
  'Rotrender Hexed Horror',
  'Rotrender Scourge Of Azzilon',
])

export default class BossStatisticsData {
  public bossStatistics: BossStatistics = {
    server: '',
    latest: {
      hash: '',
      timestamp: 0,
    },
    bosses: {},
  }

  private colored = {
    server: (name: string) => coloredText(name, 'control'),
    file: (name: string) => coloredText(`${name}.json`, 'highlight'),
  }

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
    const serverFile = this.colored.file(serverName)

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
      `Updated boss statistics were saved to ${this.colored.file(serverName)}`,
      'success',
    )
  }

  public async saveBossChance(bossChances: BossChances): Promise<void> {
    const { server } = bossChances
    await fs.writeFile(
      file.BOSS_CHANCES.serverResolver(server),
      JSON.stringify(bossChances),
    )
    tabBroadcast(
      `Current boss chances for ${this.colored.server(server)} were saved`,
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
      const entryNames = multinameBosses.get(bossName) ?? [bossName]

      entryNames.forEach((name) => {
        const killData = bossKillsData[name] ?? {
          playersKilled: 0,
          killedByPlayers: 0,
        }

        if (!trackedBosses[bossName]) {
          trackedBosses[bossName] = killData
        } else {
          trackedBosses[bossName].playersKilled += killData.playersKilled
          trackedBosses[bossName].killedByPlayers += killData.killedByPlayers
        }
      })
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
      tabBroadcast(
        `Data for ${this.colored.server(serverName)} still not updated`,
        'control',
      )
      return
    }

    const newestHash = this.generateHash(bossKillsData)
    const currentSSTimestamp = +getDateRelativeToSS()

    const trackedBossKills = this.normalizeBossKills(bossKillsData)

    Object.entries(trackedBossKills).forEach(
      ([bossName, { playersKilled, killedByPlayers }]) => {
        const appeared = playersKilled + killedByPlayers > 0

        if (appeared) {
          const bossSchema = bossStatistics.get(
            bossDictionary[bossName as BossToken],
          )

          const appearencesCount = bossSchema?.spawnCount
            ? Math.max(killedByPlayers, 1)
            : 1

          doTimes(() => {
            this.bossStatistics.bosses[bossName].appearences.push(
              currentSSTimestamp,
            )
          }, appearencesCount)
        }
      },
    )

    this.bossStatistics.latest.hash = newestHash
    this.bossStatistics.latest.timestamp = currentSSTimestamp

    await this.save()
  }

  getBossStatistics(): BossStatistics {
    if (this.bossStatistics.latest.timestamp === 0) {
      throw Error('Trying to read boss statistics before loading them')
    }

    return this.bossStatistics
  }
}

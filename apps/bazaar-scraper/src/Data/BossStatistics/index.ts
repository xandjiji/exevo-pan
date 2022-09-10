import fs from 'fs/promises'
import { constTokens as bossDictionary } from 'data-dictionary/dist/dictionaries/bosses'
import { broadcast, coloredText } from 'logging'
import { file } from 'Constants'
import { sha256 } from 'utils'

const { serverResolver } = file.BOSS_STATISTICS

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

  private async save(): Promise<void> {
    const serverName = this.bossStatistics.server

    await fs.writeFile(
      serverResolver(serverName),
      JSON.stringify(this.bossStatistics),
    )
    broadcast(
      `Updated boss statistics and saved to ${this.coloredFileName(
        serverName,
      )}`,
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

  public async feedData(
    bossKillsData: Record<string, BossKills>,
  ): Promise<void> {
    const serverName = this.bossStatistics.server

    const newestHash = this.generateHash(bossKillsData)
    const currentTimestamp = +new Date()

    if (this.bossStatistics.latest.hash === newestHash) {
      broadcast(`Data for ${serverName} still not updated`, 'neutral')
      return
    }

    const trackedBossKills = this.normalizeBossKills(bossKillsData)

    Object.entries(trackedBossKills).forEach(
      ([bossName, { playersKilled, killedByPlayers }]) => {
        const appeared = playersKilled + killedByPlayers > 0

        if (appeared) {
          /* @ ToDo: add a limit for this? */
          this.bossStatistics.bosses[bossName].appearences.push(
            currentTimestamp,
          )
        }
      },
    )

    this.bossStatistics.latest.hash = newestHash
    this.bossStatistics.latest.timestamp = currentTimestamp

    await this.save()
  }
}

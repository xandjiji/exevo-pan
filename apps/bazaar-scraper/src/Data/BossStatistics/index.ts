import fs from 'fs/promises'
import { broadcast, coloredText } from 'logging'
import { file } from 'Constants'
import { sha256 } from 'utils'

const { serverResolver } = file.BOSS_STATISTICS

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

  async loadServer(serverName: string): Promise<void> {
    const serverFile = this.coloredFileName(serverName)

    broadcast(`Loading ${serverFile}...`, 'system')

    try {
      this.bossStatistics = JSON.parse(
        await fs.readFile(serverResolver(serverName), 'utf-8'),
      )
    } catch {
      broadcast(
        `Failed to load ${serverFile}, initializing a new one...`,
        'fail',
      )
    }
  }

  private async save(serverStatistics: BossStatistics): Promise<void> {
    const serverName = serverStatistics.server
    await fs.writeFile(
      serverResolver(serverName),
      JSON.stringify(serverStatistics),
    )
    broadcast(
      `Updated boss statistics and saved to ${this.coloredFileName(
        serverName,
      )}`,
      'success',
    )
  }
}

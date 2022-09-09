import cheerio, { Element } from 'cheerio/lib/index'
import { exitIfMaintenance } from 'utils'
import { bossList } from './bossList'

export default class KillStatistics {
  private maintenanceCheck(content: string): boolean {
    const $ = cheerio.load(content)
    const headingElement = $('h1')
    return headingElement.text() === 'Downtime'
  }

  private bossName(element: Element): string {
    return cheerio('td:nth-child(1)', element).text()
  }

  private playersKilled(element: Element): number {
    return +cheerio('td:nth-child(2)', element).text()
  }

  private killedByPlayers(element: Element): number {
    return +cheerio('td:nth-child(3)', element).text()
  }

  lastDayBossKills(content: string): Record<string, BossKills> {
    exitIfMaintenance(() => this.maintenanceCheck(content))

    const $ = cheerio.load(content)

    const bossKillsEntries: Record<string, BossKills> = {}
    bossList.forEach((bossName) => {
      bossKillsEntries[bossName] = {
        playersKilled: 0,
        killedByPlayers: 0,
      }
    })

    const bossRows = $('.Odd, .Even')
    bossRows.each((_, element) => {
      const bossName = this.bossName(element)

      if (bossList.has(bossName)) {
        bossKillsEntries[bossName] = {
          playersKilled: this.playersKilled(element),
          killedByPlayers: this.killedByPlayers(element),
        }
      }
    })

    return bossKillsEntries
  }

  servers(content: string): string[] {
    exitIfMaintenance(() => this.maintenanceCheck(content))

    const $ = cheerio.load(content)

    const serverOptions = $('select[name="world"] option')
    const serverNames: string[] = []
    serverOptions.each((_, element) => {
      const { value } = element.attribs
      if (value) serverNames.push(value)
    })

    return serverNames
  }
}

import cheerio, { Element } from 'cheerio/lib/index'
import { exitIfMaintenance } from 'utils'

export default class KillStatistics {
  private errorCheck(content: string): boolean {
    const $ = cheerio.load(content)
    const title = $('.Text:contains("Kill Statistics")').html()
    return !title
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
    exitIfMaintenance(() => this.errorCheck(content))

    const $ = cheerio.load(content)

    const bossKillsEntries: Record<string, BossKills> = {}

    const bossRows = $('.Odd, .Even')
    bossRows.each((_, element) => {
      bossKillsEntries[this.bossName(element)] = {
        playersKilled: this.playersKilled(element),
        killedByPlayers: this.killedByPlayers(element),
      }
    })

    return bossKillsEntries
  }

  servers(content: string): string[] {
    const $ = cheerio.load(content)

    const serverOptions = $('select[name="world"] option')
    const serverNames: string[] = []
    serverOptions.each((_, element) => {
      const { value } = element.attribs
      if (value) serverNames.push(value)
    })

    exitIfMaintenance(() => serverNames.length === 0)

    return serverNames
  }
}

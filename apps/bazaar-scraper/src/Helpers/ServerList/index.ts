import cheerio, { Element } from 'cheerio/lib/index'
import { exitIfMaintenance } from 'utils'
import { parse } from './utils'

export default class ServerList {
  private errorCheck(content: string): boolean {
    const $ = cheerio.load(content)
    const title = $('.Text:contains("Game World Overview")').html()
    return !title
  }

  name(element: Element): string {
    return cheerio('td:nth-child(1)', element).text()
  }

  onlineCount(element: Element) {
    const raw = Number(cheerio('td:nth-child(2)', element).text())
    return Number.isNaN(raw) ? null : raw
  }

  location(element: Element): ServerLocation {
    const locationText = cheerio('td:nth-child(3)', element).text()
    return parse.serverLocation(locationText)
  }

  pvpType(element: Element): PvpType {
    const pvpTypeText = cheerio('td:nth-child(4)', element).text()
    return parse.pvpType(pvpTypeText)
  }

  battleye(element: Element): boolean {
    const battleyeImageSrc = cheerio('td:nth-child(5) img', element).attr('src')

    if (!battleyeImageSrc) {
      return false
    }

    const BATTLEYE_PROTECTED_URL =
      'https://static.tibia.com/images/global/content/icon_battleyeinitial.gif'

    return battleyeImageSrc === BATTLEYE_PROTECTED_URL
  }

  experimental(element: Element): boolean {
    const serverInfoText = cheerio('td:nth-child(6)', element)
      .text()
      .toLowerCase()

    return serverInfoText.includes('experimental')
  }

  serverOnlineCount(content: string) {
    exitIfMaintenance(() => this.errorCheck(content))

    const $ = cheerio.load(content)

    const serverElements = $('.Odd, .Even')
    const serverArray: Array<
      { onlineCount: number | null } & PartialServerObject
    > = []
    serverElements.each((_, element) => {
      serverArray.push({
        serverName: this.name(element),
        serverLocation: this.location(element),
        pvpType: this.pvpType(element),
        battleye: this.battleye(element),
        experimental: this.experimental(element),
        onlineCount: this.onlineCount(element),
      })
    })

    return serverArray
  }

  servers(content: string): PartialServerObject[] {
    exitIfMaintenance(() => this.errorCheck(content))

    const $ = cheerio.load(content)

    const serverElements = $('.Odd, .Even')
    const serverArray: PartialServerObject[] = []
    serverElements.each((_, element) => {
      serverArray.push({
        serverName: this.name(element),
        serverLocation: this.location(element),
        pvpType: this.pvpType(element),
        battleye: this.battleye(element),
        experimental: this.experimental(element),
      })
    })

    return serverArray
  }
}

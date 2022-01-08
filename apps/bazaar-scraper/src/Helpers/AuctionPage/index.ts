import cheerio, { CheerioAPI } from 'cheerio/lib/index'
import { PostData } from 'Helpers'
import { sanitizeHtmlString, parseDate, exitIfMaintenance } from 'utils'
import { ServerData } from 'Data'
import {
  quest as questDictionary,
  imbuement as imbuementDictionary,
  rareAchievement as achievementDictionary,
} from 'data-dictionary/dist/dictionaries'
import { vocation as vocationHelper } from 'shared-utils/dist/vocations'
import { filterListTable } from '../utils'
import { getPagedData, loadCheerio } from './utils'
import { HistoryCheck } from './types'

export default class AuctionPage {
  private serverDataHelper = new ServerData()

  private postHelper = new PostData()

  async loadServerData(): Promise<void> {
    await this.serverDataHelper.load()
  }

  maintenanceCheck($: CheerioAPI): boolean {
    const headingElement = $('h1')
    return headingElement.text() === 'Downtime'
  }

  errorCheck($: CheerioAPI): boolean {
    const errorText = $(
      '#currentcharactertrades .Text, #pastcharactertrades .Text',
    ).text()
    return errorText === 'Error'
  }

  id($: CheerioAPI): number {
    const buttonElement = $('.DisplayOptionsButton a.BigButtonText').first()
    const onClickHandler = buttonElement.attr('onclick')!
    const [, dirtyId] = onClickHandler?.split('auctionid=')
    const [stringId] = dirtyId.split('&')

    return +stringId
  }

  isFinished($: CheerioAPI): boolean {
    return !$('.MyMaxBidLabel').length
  }

  nickname($: CheerioAPI): string {
    return $('.Auction .AuctionCharacterName').text()
  }

  auctionEnd($: CheerioAPI): number {
    const timestampElement = $('.AuctionTimer')

    if (timestampElement.length) {
      const timestamp = timestampElement.attr('data-timestamp')!
      return +timestamp
    }

    const auctionEndElement = $('.ShortAuctionDataValue').next().next()
    const sanitizedDateString = sanitizeHtmlString(auctionEndElement.text())

    return parseDate(sanitizedDateString)
  }

  currentBid($: CheerioAPI): number {
    const currentBidText = $('.ShortAuctionDataValue b').text()
    return +currentBidText.replace(/,/g, '')
  }

  hasBeenBidded($: CheerioAPI): boolean {
    const auctionStatus = $('.AuctionInfo').text()
    if (auctionStatus === 'cancelled') {
      return false
    }

    const bidElement = $('.ShortAuctionDataBidRow')
    const [bidText] = bidElement.text().split(':')

    const biddedTexts = ['Winning Bid', 'Current Bid']

    return biddedTexts.includes(bidText)
  }

  outfitId($: CheerioAPI): string {
    const outfitElement = $('.AuctionOutfitImage')
    const src = outfitElement.attr('src')!
    const [, filename] = src.split('/outfits/')
    const [outfitId] = filename.split('.')

    return outfitId
  }

  serverId($: CheerioAPI): number {
    const auctionServerName = $('.AuctionHeader a').text()
    const { serverId } =
      this.serverDataHelper.getServerByName(auctionServerName)

    return serverId
  }

  vocationId($: CheerioAPI): number {
    const headerText = $('.AuctionHeader').text()
    const [, vocation] = headerText.split(' | ')

    return vocationHelper.getIdByRegex(vocation)
  }

  level($: CheerioAPI): number {
    const headerText = $('.AuctionHeader').text()
    const [characterInfo] = headerText.split(' | ')
    const [, level] = characterInfo.split(': ')

    return +level
  }

  sex($: CheerioAPI): boolean {
    const headerText = $('.AuctionHeader').text()
    const [, , characterInfo] = headerText.split(' | ')

    return characterInfo.toLowerCase() === 'female'
  }

  transfer($: CheerioAPI): boolean {
    const transferText = $('.LabelV:contains("Regular World Transfer:")')
      .siblings('div')
      .text()

    return transferText === 'can be purchased and used immediately'
  }

  skills($: CheerioAPI): CharacterSkillsObject {
    const generalElement = $('#General .TableContentContainer tbody').children()

    const skillArray: number[] = []
    generalElement
      .find('.LevelColumn')
      .parent()
      .parent()
      .children()
      .each((_, element) => {
        const [, levelElement, percentageElement] = element.children

        const level = cheerio(levelElement).text()

        const [percentage] = cheerio('.PercentageString', percentageElement)
          .text()
          .split(' %')

        const roundedPercentage = Math.round(+percentage)
          .toString()
          .padStart(2, '0')

        const skillLevel = +`${level}.${roundedPercentage}`

        skillArray.push(skillLevel)
      })

    const [axe, club, distance, fishing, fist, magic, shielding, sword] =
      skillArray

    return {
      magic,
      club,
      fist,
      sword,
      fishing,
      axe,
      distance,
      shielding,
    }
  }

  items($: CheerioAPI): number[] {
    const itemImages = $('.AuctionItemsViewBox .CVIcon > img')

    const itemArray: number[] = []
    // eslint-disable-next-line array-callback-return
    itemImages.map((_, element) => {
      /* eslint-disable-next-line */
      const [, src] = cheerio(element).attr('src')?.split('/objects/')!

      const [itemId] = src.split('.')
      itemArray.push(+itemId)
    })

    return itemArray
  }

  imbuements($: CheerioAPI): string[] {
    const imbuementElements = $('#Imbuements .TableContentContainer tbody td')

    const { scrapingTokens } = imbuementDictionary
    const imbuementArray: string[] = []
    imbuementElements.filter(filterListTable).each((_, element) => {
      const imbuement = cheerio(element).text().trim().toLowerCase()

      const imbuementName = scrapingTokens[imbuement]
      if (imbuementName) {
        imbuementArray.push(imbuementName)
      }
    })

    return imbuementArray.sort()
  }

  charms($: CheerioAPI): string[] {
    const charmElements = $(
      '#Charms .TableContentContainer tbody td:last-child',
    )

    const charmArray: string[] = []
    charmElements.filter(filterListTable).each((_, element) => {
      const charm = cheerio(element).text()
      charmArray.push(charm)
    })

    return charmArray
  }

  quests($: CheerioAPI): string[] {
    const { scrapingTokens } = questDictionary
    const questSet = new Set<string>([])

    const achievementsElement = $(
      '#Achievements .TableContentContainer tbody td',
    )

    achievementsElement.filter(filterListTable).each((_, element) => {
      const achievement = cheerio(element).text().trim().toLowerCase()
      const quest = scrapingTokens[achievement]
      if (quest) {
        questSet.add(quest)
      }
    })

    const questsElement = $(
      '#CompletedQuestLines .TableContentContainer tbody td',
    )

    questsElement.filter(filterListTable).each((_, element) => {
      const questText = cheerio(element).text().trim().toLowerCase()
      const quest = scrapingTokens[questText]
      if (quest) {
        questSet.add(quest)
      }
    })

    return [...questSet]
  }

  rareAchievements($: CheerioAPI): string[] {
    const achievementsElement = $(
      '#Achievements .TableContentContainer tbody td',
    )

    const { scrapingTokens } = achievementDictionary
    const achievementSet = new Set<string>([])

    achievementsElement.filter(filterListTable).each((_, element) => {
      const achievement = cheerio(element).text().trim().toLowerCase()
      const rareAchievement = scrapingTokens[achievement]
      if (rareAchievement) {
        achievementSet.add(rareAchievement)
      }
    })

    return [...achievementSet]
  }

  outfitFirstPage($: CheerioAPI): Outfit[] {
    const firstPage = $('#Outfits .TableContent tbody .BlockPage')
    return this.postHelper.outfits(firstPage.html()!)
  }

  storeOutfitFirstPage($: CheerioAPI): Outfit[] {
    const firstPage = $('#StoreOutfits .TableContent tbody .BlockPage')
    const html = firstPage.html()
    return html ? this.postHelper.outfits(html) : []
  }

  mountFirstPage($: CheerioAPI): string[] {
    const firstPage = $('#Mounts .TableContent tbody .BlockPage')
    const html = firstPage.html()
    return html ? this.postHelper.mounts(html) : []
  }

  storeMountFirstPage($: CheerioAPI): string[] {
    const firstPage = $('#StoreMounts .TableContent tbody .BlockPage')
    const html = firstPage.html()
    return html ? this.postHelper.mounts(html) : []
  }

  boxSectionLastIndex(id: string, $: CheerioAPI): number {
    const lastPageLink = $(`#${id} .TableContent tbody .PageLink:last-child a`)

    let lastIndex = 1
    lastPageLink.each((_, element) => {
      const href = cheerio(element).attr('href') as string
      const [, lastPageIndex] = href.split('&currentpage=')
      lastIndex = +lastPageIndex
    })

    return lastIndex
  }

  async partialCharacterObject(
    content: CheerioAPI | string,
  ): Promise<PartialCharacterObject> {
    const $ = loadCheerio(content)

    exitIfMaintenance(() => this.maintenanceCheck($))

    return {
      id: this.id($),
      nickname: this.nickname($),
      auctionEnd: this.auctionEnd($),
      currentBid: this.currentBid($),
      hasBeenBidded: this.hasBeenBidded($),
      outfitId: this.outfitId($),
      serverId: this.serverId($),
      vocationId: this.vocationId($),
      sex: this.sex($),
      level: this.level($),
      skills: this.skills($),
      items: this.items($),
      charms: this.charms($),
      transfer: this.transfer($),
      imbuements: this.imbuements($),
      quests: this.quests($),
      ...(await getPagedData($)),
      rareAchievements: this.rareAchievements($),
    }
  }

  async checkHistoryAuction(content: string): Promise<HistoryCheck> {
    const $ = cheerio.load(content)

    exitIfMaintenance(() => this.maintenanceCheck($))

    if (this.errorCheck($)) {
      return {
        result: 'NOT_FOUND',
        data: null,
      }
    }

    if (!this.isFinished($)) {
      return {
        result: 'NOT_FINISHED',
        data: {
          id: this.id($),
          auctionEnd: this.auctionEnd($),
        },
      }
    }

    return {
      result: 'IS_FINISHED',
      data: await this.partialCharacterObject($),
    }
  }
}

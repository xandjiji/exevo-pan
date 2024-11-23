import cheerio, { CheerioAPI } from 'cheerio/lib/index'
import { PostData } from 'Helpers'
import { exitIfMaintenance, parseDate, sanitizeHtmlString } from 'utils'
import { ServerData } from 'Data'
import { totalCharacterInvestment } from 'shared-utils/dist/totalCharacterInvestment'
import { getCharacterTags } from 'shared-utils/dist/getCharacterTags'
import {
  imbuement as imbuementDictionary,
  quest as questDictionary,
  rareAchievement as achievementDictionary,
} from 'data-dictionary/dist/dictionaries'
import { vocation as vocationHelper } from 'data-dictionary/dist/dictionaries/vocations'
import { filterListTable, stringToNumber } from '../utils'
import {
  findNumber,
  getPageableAuctionData,
  getPagedData,
  loadCheerio,
} from './utils'
import { HistoryCheck, RawCheck } from './types'

export default class AuctionPage {
  private serverDataHelper = new ServerData()

  private postHelper = new PostData()

  async loadServerData(): Promise<void> {
    await this.serverDataHelper.load()
  }

  private maintenanceCheck($: CheerioAPI): boolean {
    const headingElement = $('h1')
    return headingElement.text() === 'Downtime'
  }

  private errorCheck($: CheerioAPI): boolean {
    const title = $('.Text:contains("Auction Details")').html()
    return !title
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
    return stringToNumber(currentBidText)
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

  achievementPoints($: CheerioAPI): number {
    const achievPointsLabel = $('.LabelV:contains("Achievement Points:")')
    const pointsCountElement = achievPointsLabel.next()
    return stringToNumber(pointsCountElement.text())
  }

  charmExpansion($: CheerioAPI): boolean {
    const charmExpansionText = $('.LabelV:contains("Charm Expansion:")')
      .next()
      .text()
      .trim()

    return charmExpansionText === 'yes'
  }

  huntingSlot($: CheerioAPI): boolean {
    const huntingSlotText = $(
      '.LabelV:contains("Permanent Hunting Task Slots:")',
    )
      .next()
      .text()

    return huntingSlotText === '1'
  }

  preySlot($: CheerioAPI): boolean {
    const huntingSlotText = $('.LabelV:contains("Permanent Prey Slots:")')
      .next()
      .text()

    return huntingSlotText === '1'
  }

  allCharmPoints($: CheerioAPI) {
    // @ ToDo: update this scrapping
    const unspent = stringToNumber(
      $('.LabelV:contains("Available Charm Points:")').next().text(),
    )

    const spentCharmPoints = stringToNumber(
      $('.LabelV:contains("Spent Charm Points:")').next().text(),
    )

    return unspent + spentCharmPoints
  }

  hirelings($: CheerioAPI): HirelingsInfo {
    const count = stringToNumber(
      $('.LabelV:contains("Hirelings:")').next().text(),
    )
    const jobs = stringToNumber(
      $('.LabelV:contains("Hireling Jobs:")').next().text(),
    )
    const outfits = stringToNumber(
      $('.LabelV:contains("Hireling Outfits:")').next().text(),
    )

    return { count, jobs, outfits }
  }

  bossPoints($: CheerioAPI): number {
    const bossPointsLabel = $('.LabelV:contains("Boss Points:")')
    const bossPointsElement = bossPointsLabel.next()
    return stringToNumber(bossPointsElement.text())
  }

  items($: CheerioAPI): number[] {
    const itemImages = $('.AuctionItemsViewBox > .CVIcon')

    const itemArray: number[] = []
    // eslint-disable-next-line array-callback-return
    itemImages.map((_, element) => {
      const [itemImg] = cheerio('img', element).toArray()
      if (!itemImg) return

      const [tierImg] = cheerio('.ObjectTier img', element).toArray()

      let tierNumber = 0
      if (tierImg) {
        /* eslint-disable-next-line */
        const [, tier] = cheerio(tierImg).attr('src')?.split('/tiers/')!
        const foundTier = findNumber(tier)
        if (foundTier > 0) {
          tierNumber = foundTier / 10
        }
      }

      /* eslint-disable-next-line */
      const [, src] = cheerio(itemImg).attr('src')?.split('/objects/')!

      const [itemId] = src.split('.')
      itemArray.push(+itemId + tierNumber)
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

  allAchievements($: CheerioAPI): string[] {
    const achievementsElement = $(
      '#Achievements .TableContentContainer tbody td',
    )

    const list: string[] = []

    achievementsElement.filter(filterListTable).each((_, element) => {
      const achievement = cheerio(element).text().trim().toLowerCase()
      list.push(achievement)
    })

    return list
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

  gemCount($: CheerioAPI) {
    const gems = $('#RevealedGems .Gem')

    let lesser = 0
    let regular = 0
    let greater = 0
    gems.each((_, element) => {
      const title = cheerio(element).attr('title')

      if (!title) return
      if (title.includes('Greater')) {
        greater += 1
      } else if (title.includes('Lesser')) {
        lesser += 1
      } else {
        regular += 1
      }
    })

    return { lesser, regular, greater }
  }

  greaterGems($: CheerioAPI): string[] {
    const gems = $(
      '#RevealedGems td:nth-child(2) .ModEffectRow .ModIconCharBazaarSupremeMod + span',
    )

    const greaterGemList = new Set<string>([])
    gems.each((_, element) => {
      let detail = cheerio(element.children[2]).text()
      if (detail) {
        detail = ` (${detail})`
      }
      greaterGemList.add(`${cheerio(element.children[0]).text()}${detail}`)
    })

    return [...greaterGemList].sort()
  }

  storeFirstPage($: CheerioAPI): CharacterItem[] {
    const firstPage = $('#StoreItemSummary .TableContent tbody .BlockPage')
    const html = firstPage.html()
    return html ? this.postHelper.items(html) : []
  }

  outfitFirstPage($: CheerioAPI): Outfit[] {
    const firstPage = $('#Outfits .TableContent tbody .BlockPage')
    const html = firstPage.html()
    return html ? this.postHelper.outfits(html) : []
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

    const characterObject: PartialCharacterObject = {
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
      achievementPoints: this.achievementPoints($),
      bossPoints: this.bossPoints($),
      tcInvested: 0,
      tags: [],
      skills: this.skills($),
      items: this.items($),
      transfer: this.transfer($),
      imbuements: this.imbuements($),
      quests: this.quests($),
      ...(await getPagedData($)),
      rareAchievements: this.rareAchievements($),
      hirelings: this.hirelings($),
      huntingSlot: this.huntingSlot($),
      preySlot: this.preySlot($),
      charmInfo: {
        total: this.allCharmPoints($),
        expansion: this.charmExpansion($),
      },
      gems: this.gemCount($),
      greaterGems: this.greaterGems($),
    }

    characterObject.tcInvested = totalCharacterInvestment(characterObject)
    characterObject.tags = getCharacterTags(characterObject)

    // @ ToDo: abstract this to a function if checking for outfits become more frequent to find completed quests
    if (
      characterObject.outfits.find(({ name }) => name === 'Decaying Defender')
    ) {
      characterObject.quests.push(questDictionary.constTokens['Rotten Blood'])
    }

    return characterObject
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

  async getPageableData(content: string): Promise<RawAuction> {
    const $ = cheerio.load(content)

    const auctionId = this.id($)

    return {
      id: this.id($),
      html: content,
      pageableData: await getPageableAuctionData(auctionId, $),
    }
  }

  async checkRawAuction(content: string): Promise<RawCheck> {
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
      data: await this.getPageableData(content),
    }
  }
}

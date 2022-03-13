import fs from 'fs/promises'
import { broadcast, coloredDiff } from 'logging'
import { file } from 'Constants'
import { makeRangeArray } from 'utils'
import { readJsonl, writeJsonl } from 'shared-utils/dist/jsonl'
import { printFilename, removeDupedIds } from './utils'
import { ScrapHistoryData } from './types'

const { SCRAP_HISTORY_DATA, HISTORY_AUCTIONS } = file

export default class CurrentAuctionsData {
  private lastScrapedId = 0

  private unfinishedAuctions: UnfinishedAuction[] = []

  private historyAuctions: PartialCharacterObject[] = []

  private unfinishedBuffer: UnfinishedAuction[] = []

  private finishedBuffer: PartialCharacterObject[] = []

  private maturedIdsBuffer: Set<number> = new Set([])

  private async loadScrapData(): Promise<void> {
    broadcast(`Loading ${printFilename(SCRAP_HISTORY_DATA.name)}...`, 'system')
    try {
      const data = await fs.readFile(SCRAP_HISTORY_DATA.path, 'utf-8')
      const { lastScrapedId, unfinishedAuctions }: ScrapHistoryData =
        JSON.parse(data)

      this.lastScrapedId = lastScrapedId
      this.unfinishedAuctions = unfinishedAuctions
    } catch {
      broadcast(
        `Failed to load ${printFilename(
          SCRAP_HISTORY_DATA.name,
        )}, initializing a new one...`,
        'fail',
      )

      const scrapHistoryData: ScrapHistoryData = {
        lastScrapedId: this.lastScrapedId,
        unfinishedAuctions: this.unfinishedAuctions,
      }
      await fs.writeFile(
        SCRAP_HISTORY_DATA.path,
        JSON.stringify(scrapHistoryData),
      )
    }
  }

  private async loadHistory(): Promise<void> {
    broadcast(`Loading ${printFilename(HISTORY_AUCTIONS.name)}...`, 'system')
    try {
      this.historyAuctions = await readJsonl<PartialCharacterObject>(
        HISTORY_AUCTIONS.path,
      )
    } catch {
      broadcast(
        `Failed to load ${printFilename(
          HISTORY_AUCTIONS.name,
        )}, initializing a new one...`,
        'fail',
      )
      await writeJsonl(HISTORY_AUCTIONS.path, [])
    }
  }

  private async save(): Promise<void> {
    if (this.historyAuctions.length === 0) {
      broadcast(
        `WARNING! Writing empty values to ${printFilename(
          HISTORY_AUCTIONS.name,
        )}`,
        'fail',
      )
    }

    this.historyAuctions = removeDupedIds(
      this.historyAuctions.sort((a, b) => b.auctionEnd - a.auctionEnd),
    )

    await writeJsonl(HISTORY_AUCTIONS.path, this.historyAuctions)

    const scrapHistoryData: ScrapHistoryData = {
      lastScrapedId: this.lastScrapedId,
      unfinishedAuctions: this.unfinishedAuctions,
    }
    await fs.writeFile(
      SCRAP_HISTORY_DATA.path,
      JSON.stringify(scrapHistoryData),
    )
  }

  private appendBuffers(): void {
    this.finishedBuffer.forEach((auction) => this.historyAuctions.push(auction))
    this.unfinishedBuffer.forEach((unfinishedAuction) =>
      this.unfinishedAuctions.push(unfinishedAuction),
    )
    this.unfinishedAuctions = this.unfinishedAuctions.filter(
      ({ id }) => !this.maturedIdsBuffer.has(id),
    )
  }

  private flushBuffers(): void {
    this.finishedBuffer = []
    this.unfinishedBuffer = []
    this.maturedIdsBuffer = new Set([])
  }

  private getHighestAuctionId(): number {
    let highest = 0
    this.historyAuctions.forEach(({ id }) => {
      if (id > highest) highest = id
    })
    return highest
  }

  async load(): Promise<void> {
    await this.loadScrapData()
    await this.loadHistory()
  }

  public getEntireHistory(): PartialCharacterObject[] {
    return this.historyAuctions
  }

  public getUnscrapedIds(newHighestAuctionId: number): number[] {
    return makeRangeArray(this.lastScrapedId + 1, newHighestAuctionId)
  }

  public getMaturedAuctionIds(): number[] {
    const currentTimestamp = +new Date() / 1000
    return this.unfinishedAuctions
      .filter(({ auctionEnd }) => currentTimestamp > auctionEnd)
      .map(({ id }) => id)
  }

  public appendFinishedBuffer(finishedAuction: PartialCharacterObject): void {
    this.finishedBuffer.push(finishedAuction)
  }

  public appendUnfinishedBuffer(unfinishedAuction: UnfinishedAuction): void {
    this.unfinishedBuffer.push(unfinishedAuction)
  }

  public appendMaturedId(id: number): void {
    this.maturedIdsBuffer.add(id)
  }

  public async saveBuffers(): Promise<void> {
    const previousUnfinishedCount = this.unfinishedAuctions.length
    this.appendBuffers()
    this.lastScrapedId = this.getHighestAuctionId()
    await this.save()

    const unfinishedDiff =
      this.unfinishedAuctions.length - previousUnfinishedCount

    broadcast(
      `Fresh history auctions (${coloredDiff(
        this.finishedBuffer.length,
      )} entries) were saved to ${printFilename(HISTORY_AUCTIONS.name)}`,
      'success',
    )
    broadcast(
      `Updated scrap history data (${coloredDiff(
        unfinishedDiff,
      )} entries) were saved to ${printFilename(SCRAP_HISTORY_DATA.name)}`,
      'success',
    )

    this.flushBuffers()
  }
}

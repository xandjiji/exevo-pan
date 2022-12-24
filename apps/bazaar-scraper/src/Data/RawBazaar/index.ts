import fs from 'fs/promises'
import zlib from 'zlib'
import { broadcast, coloredDiff } from 'logging'
import { file } from 'Constants'
import { makeRangeArray } from 'utils'
import { printFilename } from './utils'
import { ScrapHistoryData } from './types'

const { SCRAP_RAW_DATA, RAW_DATA_FOLDER } = file
const BASE_INDEX = 2

export default class RawBazaarData {
  private lastScrapedId = 0

  private unfinishedAuctions: UnfinishedAuction[] = []

  private unfinishedBuffer: UnfinishedAuction[] = []

  private rawBuffer: RawAuction[] = []

  private maturedIdsBuffer: Set<number> = new Set([])

  private async loadScrapData(): Promise<void> {
    broadcast(`Loading ${printFilename(SCRAP_RAW_DATA.name)}...`, 'system')
    try {
      const data = await fs.readFile(SCRAP_RAW_DATA.path, 'utf-8')
      const { lastScrapedId, unfinishedAuctions }: ScrapHistoryData =
        JSON.parse(data)

      this.lastScrapedId = lastScrapedId
      this.unfinishedAuctions = unfinishedAuctions
    } catch {
      broadcast(
        `Failed to load ${printFilename(
          SCRAP_RAW_DATA.name,
        )}, initializing a new one...`,
        'fail',
      )

      const scrapRawData: ScrapHistoryData = {
        lastScrapedId: this.lastScrapedId,
        unfinishedAuctions: this.unfinishedAuctions,
      }
      await fs.writeFile(SCRAP_RAW_DATA.path, JSON.stringify(scrapRawData))
    }
  }

  public async saveRawAuction(rawAuction: RawAuction): Promise<void> {
    const { id, html, pageableData } = rawAuction

    const fileWriteCalls: Array<() => Promise<void>> = []
    Object.keys(pageableData).forEach((key) => {
      const currentPageable = pageableData[key as keyof typeof pageableData]

      currentPageable.forEach((content, index) => {
        fileWriteCalls.push(() =>
          fs.writeFile(
            RAW_DATA_FOLDER.auctionResolver(id, `${key}-${index + BASE_INDEX}`),
            zlib.gzipSync(content),
          ),
        )
      })
    })

    await fs.mkdir(RAW_DATA_FOLDER.dirResolver(id), { recursive: true })

    await Promise.all([
      fs.writeFile(
        RAW_DATA_FOLDER.auctionResolver(id, 'html'),
        zlib.gzipSync(html),
      ),
      ...fileWriteCalls.map((fn) => fn()),
    ])
  }

  private async save(): Promise<void> {
    const scrapHistoryData: ScrapHistoryData = {
      lastScrapedId: this.lastScrapedId,
      unfinishedAuctions: this.unfinishedAuctions,
    }
    await fs.writeFile(SCRAP_RAW_DATA.path, JSON.stringify(scrapHistoryData))

    await Promise.all(
      this.rawBuffer.map((rawAuction) => this.saveRawAuction(rawAuction)),
    )
  }

  private appendBuffers(): void {
    this.unfinishedBuffer.forEach((unfinishedAuction) =>
      this.unfinishedAuctions.push(unfinishedAuction),
    )
    this.unfinishedAuctions = this.unfinishedAuctions.filter(
      ({ id }) => !this.maturedIdsBuffer.has(id),
    )
  }

  private flushBuffers(): void {
    this.rawBuffer = []
    this.unfinishedBuffer = []
    this.maturedIdsBuffer = new Set([])
  }

  async load(): Promise<void> {
    await this.loadScrapData()
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

  public appendRawBuffer(rawData: RawAuction): void {
    this.rawBuffer.push(rawData)
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

    const [highestId] = this.rawBuffer.map(({ id }) => id).sort((a, b) => b - a)
    this.lastScrapedId = highestId
    await this.save()

    const unfinishedDiff =
      this.unfinishedAuctions.length - previousUnfinishedCount

    broadcast(
      `Updated scrap raw history data (${coloredDiff(
        unfinishedDiff,
      )} entries) were saved to ${printFilename(SCRAP_RAW_DATA.name)}`,
      'success',
    )

    this.flushBuffers()
  }
}

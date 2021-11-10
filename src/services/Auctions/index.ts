import { endpoints } from 'Constants'
import { PaginationOptions, CacheObject } from './types'

const DEFAULT_PAGE_INDEX = 0
const DEFAULT_PAGE_SIZE = 10

const EMPTY_RESPONSE: PaginatedData<CharacterObject> = {
  page: [],
  pageIndex: 0,
  totalItems: 0,
  startOffset: 0,
  endOffset: 0,
  hasPrev: false,
  hasNext: false,
}

export default class AuctionsClient {
  static cache: CacheObject = {}

  static currentAuctionsUrl = endpoints.CURRENT_AUCTIONS

  static getCache(key: string): PaginatedData<CharacterObject> | undefined {
    return this.cache[key]
  }

  static setCache(key: string, data: PaginatedData<CharacterObject>): void {
    this.cache[key] = data
    setTimeout(() => delete this.cache[key], 10000)
  }

  static async fetchAuctionPage({
    pageIndex = DEFAULT_PAGE_INDEX,
    pageSize = DEFAULT_PAGE_SIZE,
  }: PaginationOptions): Promise<PaginatedData<CharacterObject>> {
    const body = { pageIndex, pageSize }
    const bodyPayload = JSON.stringify(body)

    const cachedResult = this.getCache(bodyPayload)
    if (cachedResult) return cachedResult

    try {
      const response = await fetch(this.currentAuctionsUrl, {
        method: 'POST',
        body: bodyPayload,
      })

      const data = (await response.json()) as PaginatedData<CharacterObject>
      this.setCache(bodyPayload, data)

      return data
    } catch (error: unknown) {
      console.log(error)
      return { ...EMPTY_RESPONSE, pageIndex }
    }
  }
}

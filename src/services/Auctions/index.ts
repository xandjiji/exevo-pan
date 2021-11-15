import { endpoints } from 'Constants'
import { serializeBody } from './utils'
import { FetchAuctionPageParameters, CacheObject } from './types'

const CACHE_MAX_AGE = 180000

const EMPTY_RESPONSE: PaginatedData<CharacterObject> = {
  page: [],
  pageIndex: 0,
  totalItems: 0,
  startOffset: 0,
  endOffset: 0,
  hasPrev: false,
  hasNext: false,
  sortingMode: 0,
  descendingOrder: false,
}

export default class AuctionsClient {
  static cache: CacheObject = {}

  static currentAuctionsUrl = endpoints.CURRENT_AUCTIONS

  static getCache(key: string): PaginatedData<CharacterObject> | undefined {
    return this.cache[key]
  }

  static setCache(key: string, data: PaginatedData<CharacterObject>): void {
    this.cache[key] = data
    setTimeout(() => delete this.cache[key], CACHE_MAX_AGE)
  }

  static async fetchAuctionPage({
    paginationOptions,
    sortOptions,
    filterOptions,
  }: FetchAuctionPageParameters): Promise<PaginatedData<CharacterObject>> {
    const bodyPayload = serializeBody(
      paginationOptions,
      sortOptions,
      filterOptions,
    )

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
      return {
        ...EMPTY_RESPONSE,
        ...sortOptions,
        pageIndex: paginationOptions.pageIndex,
      }
    }
  }
}

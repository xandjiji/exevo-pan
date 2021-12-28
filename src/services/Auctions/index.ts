import { endpoints, paths } from 'Constants'
import { serializeBody, buildHeaders } from './utils'
import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_STATE,
} from './defaults'
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

  static highlightedAuctionsUrl = `${endpoints.STATIC_DATA}${paths.HIGHLIGHTED_AUCTIONS}`

  static getCache(
    key: string,
    endpoint: string,
  ): PaginatedData<CharacterObject> | undefined {
    const cacheKey = `${key}${endpoint}`
    return this.cache[cacheKey]
  }

  static setCache(
    key: string,
    endpoint: string,
    data: PaginatedData<CharacterObject>,
  ): void {
    const cacheKey = `${key}${endpoint}`
    this.cache[cacheKey] = data
    setTimeout(() => delete this.cache[cacheKey], CACHE_MAX_AGE)
  }

  static async fetchAuctionPage({
    paginationOptions = DEFAULT_PAGINATION_OPTIONS,
    sortOptions = DEFAULT_SORT_OPTIONS,
    filterOptions = DEFAULT_FILTER_STATE,
    endpoint,
  }: FetchAuctionPageParameters): Promise<PaginatedData<CharacterObject>> {
    const bodyPayload = serializeBody(
      paginationOptions,
      sortOptions,
      filterOptions,
    )

    const cachedResult = this.getCache(bodyPayload, endpoint)
    if (cachedResult) return cachedResult

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: buildHeaders(endpoint),
      body: bodyPayload,
    })

    const data: PaginatedData<CharacterObject> = await response.json()
    this.setCache(bodyPayload, endpoint, data)

    return data
  }

  static async fetchHighlightedAuctions(): Promise<CharacterObject[]> {
    try {
      const response = await fetch(this.highlightedAuctionsUrl)
      const auctions: CharacterObject[] = await response.json()

      const currentTimestamp = +new Date() / 1000
      const activeAuctions = auctions.filter(
        (auction) => auction.auctionEnd > currentTimestamp,
      )

      return activeAuctions
    } catch (error: unknown) {
      console.log(error)
      return []
    }
  }
}

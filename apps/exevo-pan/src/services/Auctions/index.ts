/* eslint-disable no-console */
import { endpoints } from 'Constants'
import { serializeBody } from 'shared-utils/dist/contracts/Filters/utils'
import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { readableCurrentDate, MILLISECONDS_IN } from 'utils'
import { buildHeaders } from './utils'
import {
  FetchAuctionPageParameters,
  CacheObject,
  RawHighlightedData,
} from './types'

const CACHE_MAX_AGE = 180000
const MINIMUM_HIGHLIGHTED_AMOUNT = 2

export default class AuctionsClient {
  static cache: CacheObject = {}

  static highlightedAuctionsUrl = `${endpoints.BACKOFFICE_API}`

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
    filterOptions = DEFAULT_FILTER_OPTIONS,
    endpoint,
  }: FetchAuctionPageParameters): Promise<PaginatedData<CharacterObject>> {
    const bodyPayload = serializeBody({
      paginationOptions,
      sortOptions,
      filterOptions,
    })

    const cachedResult = this.getCache(bodyPayload, endpoint)
    if (cachedResult) return cachedResult

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: buildHeaders(endpoint),
      body: bodyPayload,
    })

    const data: FilterResponse = await response.json()
    this.setCache(bodyPayload, endpoint, data)

    return data
  }

  static async fetchHighlightedAuctions(): Promise<CharacterObject[]> {
    try {
      const response = await fetch(this.highlightedAuctionsUrl)
      const dirtyData: RawHighlightedData[] = await response.json()
      const parsedData: HighlightedAuctionData[] = dirtyData.map(
        ({ metadata }) => JSON.parse(metadata),
      )

      const currentTimestamp = +new Date()

      const currentDate = readableCurrentDate()

      const activeHighlightedIds = parsedData
        .filter(({ days }) => days.includes(currentDate))
        .filter(({ active }) => active)
        .filter(
          ({ timestamp }) =>
            currentTimestamp - timestamp >= MILLISECONDS_IN.MINUTE * 15,
        )
        .map(({ id }) => id)

      const highlightedAuctionIds = new Set<number>(activeHighlightedIds)

      const { page: highlightedAuctions } = await this.fetchAuctionPage({
        endpoint: endpoints.CURRENT_AUCTIONS,
        paginationOptions: {
          ...DEFAULT_PAGINATION_OPTIONS,
          pageSize: 50,
        },
        filterOptions: {
          ...DEFAULT_FILTER_OPTIONS,
          auctionIds: highlightedAuctionIds,
        },
      })

      if (highlightedAuctions.length >= MINIMUM_HIGHLIGHTED_AMOUNT) {
        return highlightedAuctions
      }

      const { page: highestValueAuctions } = await this.fetchAuctionPage({
        endpoint: endpoints.CURRENT_AUCTIONS,
        filterOptions: {
          ...DEFAULT_FILTER_OPTIONS,
          biddedOnly: true,
        },
        sortOptions: {
          sortingMode: 2,
          descendingOrder: true,
        },
      })

      return [
        ...highlightedAuctions,
        ...highestValueAuctions
          .filter(({ id }) => !highlightedAuctionIds.has(id))
          .slice(0, MINIMUM_HIGHLIGHTED_AMOUNT - highlightedAuctions.length),
      ].sort((a, b) => a.auctionEnd - b.auctionEnd)
    } catch (error: unknown) {
      console.log(error)
      return []
    }
  }
}

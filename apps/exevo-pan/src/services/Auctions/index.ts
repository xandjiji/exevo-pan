/* eslint-disable no-console */
import { endpoints } from 'Constants'
import { serializeBody } from 'shared-utils/dist/contracts/Filters/utils'
import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { serializeUrlParams } from 'hooks/useUrlParamsState/utils'
import { schema as filtersSchema } from 'modules/BazaarAuctions/contexts/useFilters/schema'
import { schema as auctionsSchema } from 'modules/BazaarAuctions/contexts/useAuctions/schema'
import { buildHeaders, filterActiveHighlights } from './utils'
import {
  FetchAuctionPageParameters,
  CacheObject,
  FetchAuctionByIdParameters,
} from './types'

const MINIMUM_HIGHLIGHTED_AMOUNT = 2

export default class AuctionsClient {
  static cache: CacheObject = {}

  static highlightedAuctionsUrl = `${endpoints.BACKOFFICE_API}`

  static async fetchAuctionPage({
    paginationOptions = DEFAULT_PAGINATION_OPTIONS,
    sortOptions = DEFAULT_SORT_OPTIONS,
    filterOptions = DEFAULT_FILTER_OPTIONS,
    endpoint,
  }: FetchAuctionPageParameters): Promise<PaginatedData<CharacterObject>> {
    const serializedFilters = serializeUrlParams({
      values: { ...filterOptions, ...paginationOptions, ...sortOptions },
      schema: {
        ...filtersSchema,
        ...auctionsSchema.pagination,
        ...auctionsSchema.buildSortingSchema(DEFAULT_SORT_OPTIONS),
      },
    })

    /* console.log(`${endpoint}?${serializedFilters}`) */
    /* const response = await fetch(`${endpoint}${serializedFilters}`)

    const data: FilterResponse = await response.json()

    return data */

    return {
      descendingOrder: true,
      endOffset: 0,
      hasNext: true,
      hasPrev: true,
      page: [],
      pageIndex: 0,
      sortingMode: 0,
      startOffset: 0,
      totalItems: 1,
    }
  }

  static async fetchHighlightedAuctions(): Promise<CharacterObject[]> {
    try {
      const response = await fetch(this.highlightedAuctionsUrl)
      const highlightedAuctionsData: HighlightedAuctionData[] =
        await response.json()

      const highlightedAuctionIds = filterActiveHighlights(
        highlightedAuctionsData,
      )

      const { page } = await this.fetchAuctionPage({
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

      const highlightedAuctions = page.filter(({ id }) =>
        highlightedAuctionIds.has(id),
      )

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

  static async fetchAuctionById({
    auctionId,
    endpoint,
  }: FetchAuctionByIdParameters): Promise<CharacterObject | undefined> {
    const bodyPayload = serializeBody({
      paginationOptions: DEFAULT_PAGINATION_OPTIONS,
      sortOptions: DEFAULT_SORT_OPTIONS,
      filterOptions: {
        ...DEFAULT_FILTER_OPTIONS,
        auctionIds: new Set([auctionId]),
      },
    })

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: buildHeaders(endpoint),
      body: bodyPayload,
    })

    const data: FilterResponse = await response.json()

    const [foundAuction] = data.page
    return foundAuction
  }
}

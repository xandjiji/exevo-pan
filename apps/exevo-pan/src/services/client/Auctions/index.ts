import { endpoints } from 'Constants'
import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { serializeUrlParams } from 'hooks/useUrlParamsState/utils'
import { schema as filtersSchema } from 'modules/BazaarAuctions/contexts/useFilters/schema'
import { schema as auctionsSchema } from 'modules/BazaarAuctions/contexts/useAuctions/schema'
import { buildHeaders, filterActiveHighlights } from './utils'
import { FetchAuctionPageArgs } from './types'

export default class AuctionsClient {
  static async fetchAuctionPage({
    paginationOptions,
    sortOptions,
    filterOptions,
    history,
  }: FetchAuctionPageArgs): Promise<PaginatedData<CharacterObject>> {
    const serializedFilters = serializeUrlParams({
      values: { ...filterOptions, ...paginationOptions, ...sortOptions },
      schema: {
        ...filtersSchema,
        ...auctionsSchema.pagination,
        ...auctionsSchema.buildSortingSchema(DEFAULT_SORT_OPTIONS),
      },
    })

    console.log(serializedFilters)
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

  /* static async fetchAuctionById({
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
  } */
}

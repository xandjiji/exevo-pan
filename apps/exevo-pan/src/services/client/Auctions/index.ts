import { endpoints } from 'Constants'
import { DEFAULT_SORT_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { serializeUrlParams } from 'hooks/useUrlParamsState/utils'
import { schema as filtersSchema } from 'modules/BazaarAuctions/contexts/useFilters/schema'
import { schema as auctionsSchema } from 'modules/BazaarAuctions/contexts/useAuctions/schema'
import { filterActiveHighlights } from './utils'
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
        ...auctionsSchema.buildSortingSchema(
          DEFAULT_SORT_OPTIONS[history ? 'history' : 'current'],
        ),
      },
    })

    const response = await fetch(
      `/api/auctions?history=${history}&${serializedFilters}`,
    )

    const result: PaginatedData<CharacterObject> = await response.json()

    return result
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

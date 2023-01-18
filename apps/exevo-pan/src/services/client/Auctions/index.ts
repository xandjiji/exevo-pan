import {
  serializeFilter,
  serializePagination,
  serializeSort,
} from 'shared-utils/dist/contracts/Filters/schemas'
import { DEFAULT_SORT_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { links, endpoints } from 'Constants'
import { FetchAuctionPageArgs, FetchFavoritedArgs } from './types'

export default class AuctionsClient {
  static async fetchAuctionPage({
    filterOptions,
    paginationOptions,
    sortOptions,
    history,
  }: FetchAuctionPageArgs): Promise<PaginatedData<CharacterObject>> {
    const endpoint = new URL(`${links.CANONICAL}${endpoints.AUCTIONS_ROUTE}`)
    const currentParams = new URLSearchParams()

    serializeFilter({ values: { ...filterOptions }, currentParams })
    serializePagination({ values: { ...paginationOptions }, currentParams })
    serializeSort({
      values: { ...sortOptions },
      currentParams,
    })

    endpoint.search = currentParams.toString()
    if (history) endpoint.searchParams.set('history', 'true')

    const response = await fetch(
      `${endpoints.AUCTIONS_ROUTE}${endpoint.search}`,
    )

    return response.json()
  }

  static async fetchFavorited({
    ids,
    sortOptions,
  }: FetchFavoritedArgs): Promise<{
    favoritedState: FavoritedState
    paginatedData: PaginatedData<CharacterObject>
  }> {
    if (ids.length === 0) {
      return {
        favoritedState: { currentIds: [], historyIds: [], notFoundIds: [] },
        paginatedData: {
          descendingOrder:
            sortOptions?.descendingOrder ??
            DEFAULT_SORT_OPTIONS.descendingOrder,
          sortingMode:
            sortOptions?.sortingMode ?? DEFAULT_SORT_OPTIONS.sortingMode,
          startOffset: 0,
          endOffset: 0,
          pageIndex: 0,
          totalItems: 0,
          hasPrev: false,
          hasNext: false,
          page: [],
        },
      }
    }

    const filterOptions: Partial<FilterOptions> = {
      auctionIds: new Set([...ids]),
    }

    const paginationOptions: PaginationOptions = { pageIndex: 0, pageSize: 50 }

    const [{ page: currentFavorites }, { page: historyFavorites }] =
      await Promise.all([
        this.fetchAuctionPage({
          filterOptions,
          paginationOptions,
          sortOptions,
          history: false,
        }),
        this.fetchAuctionPage({
          filterOptions,
          paginationOptions,
          sortOptions,
          history: true,
        }),
      ])

    const currentIds = currentFavorites.map(({ id }) => id)
    const historyIds = historyFavorites.map(({ id }) => id)

    const foundIds = new Set([...currentIds, ...historyIds])
    const notFoundIds = ids.filter((id) => !foundIds.has(id))

    const totalItems = currentIds.length + historyIds.length

    return {
      favoritedState: { currentIds, historyIds, notFoundIds },
      paginatedData: {
        descendingOrder:
          sortOptions?.descendingOrder ?? DEFAULT_SORT_OPTIONS.descendingOrder,
        sortingMode:
          sortOptions?.sortingMode ?? DEFAULT_SORT_OPTIONS.sortingMode,
        startOffset: 0,
        endOffset: totalItems,
        pageIndex: 0,
        totalItems,
        hasPrev: false,
        hasNext: false,
        page: [...currentFavorites, ...historyFavorites],
      },
    }
  }
}

export type FetchAuctionPageArgs = {
  filterOptions?: Partial<FilterOptions>
  sortOptions?: Partial<SortOptions>
  paginationOptions?: Partial<PaginationOptions>
  mode: AuctionQueryMode
}

export type FromTypes = 'current' | 'history' | 'any'

export const from = {
  ANY: 'any' as FromTypes,
  CURRENT: 'current' as FromTypes,
  HISTORY: 'history' as FromTypes,
}

export type FetchAuctionByIdArgs = {
  id: number
  from?: FromTypes
}

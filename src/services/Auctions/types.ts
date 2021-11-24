export type PaginationOptions = {
  pageIndex: number
  pageSize: number
}

export type SortOptions = {
  sortingMode: number
  descendingOrder: boolean
}

export interface FetchAuctionPageParameters {
  paginationOptions?: PaginationOptions
  sortOptions?: SortOptions
  endpoint: string
  filterOptions?: FilterState
}

export type CacheObject = Record<string, PaginatedData<CharacterObject>>

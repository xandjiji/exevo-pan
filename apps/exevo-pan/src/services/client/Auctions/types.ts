export type FetchAuctionPageArgs = {
  filterOptions?: Partial<FilterOptions>
  sortOptions?: Partial<SortOptions>
  paginationOptions?: Partial<PaginationOptions>
  history: boolean
}

export type FetchAuctionByIdArgs = {
  id: number
  from?: 'current' | 'history' | 'any'
}

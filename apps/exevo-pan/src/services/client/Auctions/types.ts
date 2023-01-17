export type FetchAuctionPageArgs = {
  filterOptions?: Partial<FilterOptions>
  sortOptions?: Partial<SortOptions>
  paginationOptions?: Partial<PaginationOptions>
  history: boolean
}

export type FetchFavoritedArgs = {
  ids: number[]
  sortOptions?: Partial<SortOptions>
}

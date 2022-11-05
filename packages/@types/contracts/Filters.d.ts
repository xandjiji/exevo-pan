declare type PaginationOptions = {
  pageIndex: number
  pageSize: number
}

declare type SortOptions = {
  sortingMode: number
  descendingOrder: boolean
}

declare type FilterResponse = PaginatedData<CharacterObject>

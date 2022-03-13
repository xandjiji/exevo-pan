declare interface PageData {
  pageIndex: number
  totalItems: number
  startOffset: number
  endOffset: number
  hasPrev: boolean
  hasNext: boolean
}

declare interface PaginatedData<T> extends PageData {
  page: T[]
  sortingMode: number
  descendingOrder: boolean
}

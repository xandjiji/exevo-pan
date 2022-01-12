export const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
  pageIndex: 0,
  pageSize: 3,
}

export const DEFAULT_SORT_OPTIONS: SortOptions = {
  sortingMode: 0,
  descendingOrder: false,
}

export const DEFAULT_FILTER_OPTIONS: BlogFilterOptions = {
  queryString: '',
  tags: new Set<string>([]),
}

export const DEFAULT_SERIALIZED_FILTER_OPTIONS: SerializedBlogFilterOptions = {
  ...DEFAULT_FILTER_OPTIONS,
  tags: [],
}

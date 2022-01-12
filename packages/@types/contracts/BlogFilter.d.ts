declare type BlogFilterOptions = {
  queryString: string
  tags: Set<string>
}

declare type BlogFilterBodyPayload = {
  paginationOptions: PaginationOptions
  sortOptions: SortOptions
  filterOptions: BlogFilterOptions
}

type BlogFilterOptionsPrimitives = Pick<BlogFilterOptions, 'queryString'>

declare interface SerializedBlogFilterOptions
  extends BlogFilterOptionsPrimitives {
  tags: string[]
}

declare interface SerializedBlogFilterBody {
  paginationOptions: PaginationOptions
  sortOptions: SortOptions
  filterOptions: SerializedBlogFilterOptions
}

declare type BlogFilterResponse = PaginatedData<BlogPost>
